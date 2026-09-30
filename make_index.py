# Wraps Shazim_Match_Day.html (from `python3 build.py`) into a standalone index.html for Vercel.
h=open('Shazim_Match_Day.html').read()
i=h.index('</style>')+len('</style>'); head,body=h[:i],h[i:]
head=head.replace("<title>Shazim's Match Day</title>","<title>Shazim's Match Day</title>\n<meta property=\"og:title\" content=\"You’re invited: Shazim’s Match Day\">\n<meta property=\"og:description\" content=\"Tap to open your invitation to a Ronaldo-themed birthday celebration.\">\n<meta name=\"theme-color\" content=\"#040405\">",1)
open('index.html','w').write('<!doctype html>\n<html lang="en"><head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'+head+'\n</head><body>\n'+body+'\n</body></html>\n')
