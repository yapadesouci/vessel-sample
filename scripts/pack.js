#!/usr/bin/env node
// Packages the cargo into a distributable zip: dist/sample-dist.zip
import { execSync } from 'child_process'
import { mkdirSync, existsSync, copyFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'dist')
const outFile = resolve(outDir, 'sample-dist.zip')

// Sync SDK bundle from node_modules
const sdkSrc = resolve(root, 'node_modules/@vessel-aircodr/sdk/dist/bundle.js')
const sdkDst = resolve(root, 'sdk/index.js')
copyFileSync(sdkSrc, sdkDst)

if (!existsSync(outDir)) mkdirSync(outDir)

// Remove stale zip if present
if (existsSync(outFile)) execSync(`rm "${outFile}"`)

execSync(
  `zip -r "${outFile}" manifest.json sdk/ apps/`,
  { cwd: root, stdio: 'inherit' }
)

console.log(`\nBuilt: dist/sample-dist.zip`)
