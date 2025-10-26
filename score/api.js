// api.js
import 'dotenv/config';
import express from 'express';
import { spawn } from 'node:child_process';

const app = express();

app.get('/score/:id', (req,res)=>{
  const p = spawn(process.execPath, ['score.js', req.params.id], { env: process.env });
  let out=''; let err='';
  p.stdout.on('data', d=> out+=d);
  p.stderr.on('data', d=> err+=d);
  p.on('close', code=>{
    if(code!==0) return res.status(500).json({error:err||'score failed'});
    try { return res.type('json').send(out); } catch(e){ return res.status(500).json({error:'parse error'}); }
  });
});

app.listen(3000, ()=> console.log('API on http://localhost:3000'));

