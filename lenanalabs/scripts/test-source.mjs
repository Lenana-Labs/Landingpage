import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const output = resolve('.taste-skill/testmodules', String(process.pid));
const compiled = new Map();
export async function source(path) {
  function compile(file) {
    file = resolve(file);
    if (compiled.has(file)) return compiled.get(file);
    const target = resolve(output, relative(resolve('src'), file).replace(/\.tsx?$/, '.mjs'));
    compiled.set(file, target);
    let code = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: {
      target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX,
    } }).outputText;
    code = code.replace(/from (["'])([^"']+)\1/g, (statement, quote, specifier) => {
      const base = specifier.startsWith('@/') ? resolve('src', specifier.slice(2)) : specifier.startsWith('.') ? resolve(dirname(file), specifier) : null;
      if (base) {
        const dependency = ['.tsx', '.ts', '/index.tsx', '/index.ts'].map(extension => base + extension).find(existsSync);
        if (dependency) return `from ${JSON.stringify(pathToFileURL(compile(dependency)).href)}`;
      }
      if (specifier === 'next/image') {
        // Node's direct ESM/CJS interop differs from Next's bundled default import.
        const adapter = resolve(output, 'next-image.mjs');
        mkdirSync(output, { recursive: true });
        writeFileSync(adapter, 'import image from "next/image.js"; export default image.default || image;');
        return `from ${JSON.stringify(pathToFileURL(adapter).href)}`;
      }
      if (specifier === 'next/link') return `from ${quote}${specifier}.js${quote}`;
      return statement;
    });
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, code);
    return target;
  }
  return import(pathToFileURL(compile(path)).href);
}
