import { serve } from 'https://deno.land/std@0.171.0/http/server.ts'

const products = [
    {
        name: 'prod1',
        price: 100,
        stock: 10
    },
    {
        name: 'prod2',
        price: 100,
        stock: 10
    }
]

serve(async(req)=>{
    const url = new URL(req.url);

  if (req.method === "GET" && url.pathname === "/products") {
    return new Response(JSON.stringify(products), {
      headers: { "Content-Type": "application/json" },
    });
  }
   return new Response("Not Found", { status: 404 });
}, { port: 3000 })

console.log('server deno ok');
