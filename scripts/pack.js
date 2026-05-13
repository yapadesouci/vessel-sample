#!/usr/bin/env node
// Packages the cargo into a distributable zip: dist/sample-dist.zip
import { execSync } from 'child_process'
import { mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'dist')
const outFile = resolve(outDir, 'sample-dist.zip')

if (!existsSync(outDir)) mkdirSync(outDir)

if (existsSync(outFile)) execSync(`rm "${outFile}"`)

execSync(
  `zip -r "${outFile}" manifest.json apps/`,
  { cwd: root, stdio: 'inherit' }
)

console.log(`\nBuilt: dist/sample-dist.zip`)
