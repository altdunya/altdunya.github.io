AltDünya Site v1

İçerik:
- index.html -> ana site
- admin.html -> tarayıcı içi admin paneli
- data/games.json -> ana veri dosyası
- assets/css/style.css -> stil dosyası
- assets/js/app.js -> site mantığı
- assets/js/admin.js -> admin mantığı

Nasıl çalışır:
1) Siteyi GitHub Pages'e yükle.
2) Admin paneli için admin.html aç.
3) Yeni oyun ekle veya mevcut oyunları düzenle.
4) Dışa Aktar ile yeni games.json dosyasını indir.
5) Repodaki data/games.json dosyasını bununla değiştir.
6) Push sonrası site güncellenir.

Notlar:
- Bu sürüm saf GitHub Pages uyumlu olduğu için admin panel doğrudan sunucuya yazmaz.
- Gerçek online yayınlama için ikinci aşamada Decap CMS / GitHub OAuth eklenebilir.
- Disqus alanı placeholder olarak eklendi. Gerçek shortname ile kolayca bağlanabilir.
- Benzer oyunlar kategori + tür + platform + seri + etiket skoruna göre otomatik gelir.
- Eksik bilgiler için placeholder/filler mantığı vardır.
