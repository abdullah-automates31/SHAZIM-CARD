import base64,sys,os
W=os.path.dirname(os.path.abspath(__file__))
def b64(p): return 'data:image/jpeg;base64,'+base64.b64encode(open(p,'rb').read()).decode()
h=open(W+'/card.src.html').read(); js=open(W+'/app2.js').read()
local = len(sys.argv)>1 and sys.argv[1]=='local'
if local:
    ff='''<style>
@font-face{font-family:"Big Shoulders Display";src:url(assets/fonts/bsd-800.woff2);font-weight:800}
@font-face{font-family:"Big Shoulders Display";src:url(assets/fonts/bsd-900.woff2);font-weight:900}
@font-face{font-family:"Barlow Condensed";src:url(assets/fonts/bc-500.woff2);font-weight:500}
@font-face{font-family:"Barlow Condensed";src:url(assets/fonts/bc-600.woff2);font-weight:600}
@font-face{font-family:"Barlow Condensed";src:url(assets/fonts/bc-700.woff2);font-weight:700}
@font-face{font-family:"Cormorant Garamond";src:url(assets/fonts/cg-600i.woff2);font-weight:600;font-style:italic}
@font-face{font-family:"Pinyon Script";src:url(assets/fonts/pinyon.woff2);font-weight:400}
</style>'''
else:
    ff='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Big+Shoulders+Display:wght@800;900&family=Cormorant+Garamond:ital,wght@1,600&family=Pinyon+Script&display=swap">'
h=h.replace('<!--FONTS-->',ff).replace('{{BOY}}',b64(W+'/assets/boy_s.jpg')).replace('{{LEGEND}}',b64(W+'/assets/legend_s.jpg')).replace('{{SIUU}}',b64(W+'/assets/siuu_s.jpg')).replace('{{APPJS}}',js.replace('{{SONG1}}','data:audio/mpeg;base64,'+base64.b64encode(open(W+'/assets/song_full.mp3','rb').read()).decode()))
out=W+('/test.html' if local else '/Shazim_Match_Day.html')
open(out,'w').write(h); print(out,len(h))
