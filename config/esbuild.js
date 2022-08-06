import esbuild from 'esbuild';
import { envs } from '../.env';

const entryPoints = [
  'src/sw.js','src/scripts/scrapper.js',
  'src/scripts/pop.js',
  'src/scripts/scrapCandidates.js',
  'src/scripts/scrapperV2'
];

const {MINIFIED, WATCH} = envs;

esbuild.build({
  entryPoints,
  watch: WATCH,
  bundle: true,
  outdir: 'dist',
  // target: 'chrome',
  minify: MINIFIED,
  allowOverwrite: true,
  // inject:['.env.js']
})
  .then(response => console.log(JSON.stringify(response)))
  .catch(err => console.log(err));