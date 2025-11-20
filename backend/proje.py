from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import requests


app = FastAPI()
templates = Jinja2Templates(directory="templates")

def ip_konum(ip: str):
    url = f"http://ip-api.com/json/{ip}?fields=status,country,regionName,city,lat,lon,isp,query"
    try:
        r = requests.get(url, timeout=3)
        return r.json()
    except:
        return {"status": "fail"}


@app.get("/", response_class=HTMLResponse)
def dashboard(request: Request):
  return "ANA PANEL"

# Talep ekranı
@app.get("/gelentalep", response_class=HTMLResponse)
def gelentalep(request: Request):
    return templates.TemplateResponse("form.html", {"request": request})

@app.post("/gelentalep_gonder")
async def form_verisi_al(
    request: Request,
    ad: str = Form(...),
    soyad: str = Form(...),
    metin: str = Form(...)
):
    client_host = request.client.host  # IP adresi
    konum = ip_konum(client_host)  # IP konum bilgisi
    user_agent = request.headers.get("user-agent")  # Tarayıcı bilgisi
    return {
        "durum": "Form verisi alındı",
        "ad": ad,
        "soyad": soyad,
        "metin": metin,
        "kullanici_ip": client_host,
        "konum_bilgisi": konum,
        "tarayici": user_agent
    }
