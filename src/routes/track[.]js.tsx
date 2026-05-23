import { createFileRoute } from "@tanstack/react-router";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "public, max-age=3600",
  "Content-Type": "application/javascript; charset=utf-8",
};

// Serves: <script src="https://aimi-digital-craft.lovable.app/track.js?u=USER_ID"></script>
export const Route = createFileRoute("/track.js")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: cors }),
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const userId = url.searchParams.get("u") ?? "";
        const origin = `${url.protocol}//${url.host}`;
        const js = `(function(){try{
  var UID=${JSON.stringify(userId)};
  if(!UID)return;
  var API=${JSON.stringify(origin)};
  function ping(ok){
    try{fetch(API+"/api/public/site-ping",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:UID,status_ok:!!ok})});}catch(e){}
  }
  function err(msg){
    try{fetch(API+"/api/public/site-error",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:UID,message:String(msg).slice(0,1900),url:location.href})});}catch(e){}
  }
  ping(true);
  setInterval(function(){ping(true);},5*60*1000);
  window.addEventListener("error",function(e){err((e&&e.message)||"error");});
  window.addEventListener("unhandledrejection",function(e){err("Unhandled: "+((e&&e.reason&&e.reason.message)||e.reason||"rejection"));});
}catch(e){}})();`;
        return new Response(js, { status: 200, headers: cors });
      },
    },
  },
});
