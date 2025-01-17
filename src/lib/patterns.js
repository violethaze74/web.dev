/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const glob = require('fast-glob');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const md = require('markdown-it')();

const stripDot = /^\./;
const basePath = path.join(__dirname, '../../src/site/content/en/patterns');
const files = glob.sync(path.join(basePath, '**', 'index.md'));

/** @type CodePatterns */
const allPatterns = files.reduce((patterns, file) => {
  const id = path.relative(basePath, path.dirname(file));
  const fileContents = matter(fs.readFileSync(file, 'utf-8'));
  if (fileContents.data.layout !== 'pattern') {
    return patterns;
  }

  const assetsPaths = glob.sync(path.join(path.dirname(file), 'assets', '*'));
  /** @type CodePatternAssets */
  const assets = assetsPaths.reduce((out, assetPath) => {
    const basename = path.basename(assetPath);
    const type = path.extname(assetPath).replace(stripDot, '');
    const content = fs.readFileSync(assetPath, 'utf-8');
    out[basename] = {
      content,
      type,
      name: basename,
    };
    return out;
  }, {});

  const content = md.render(fileContents.content);
  // Use external demo url from frontmatter, if set, or default to local demo.
  const demo =
    fileContents.data.demo || path.join('/', 'patterns', id, 'demo.html');
  const suite = path.join('/', 'patterns', path.dirname(id), '/');
  /** @type CodePattern */
  patterns[id] = {
    id,
    ...fileContents.data,
    content,
    assets,
    demo,
    suite,
  };
  return patterns;
}, {});

module.exports = function () {
  return allPatterns;
};
