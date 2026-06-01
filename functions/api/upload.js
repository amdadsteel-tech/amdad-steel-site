<input type="file" id="fileInput" accept="image/*">
<input type="text" id="descInput" placeholder="اكتب وصف الصورة هنا...">
<button id="uploadBtn" onclick="uploadImage()">رفع وحفظ</button>
<p id="status"></p>

<script>
async function uploadImage() {
    const file = document.getElementById('fileInput').files[0];
    const desc = document.getElementById('descInput').value;
    const status = document.getElementById('status');
    
    if(!file) return alert("اختر صورة أولاً");
    
    status.innerText = "جاري الرفع...";
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('desc', desc); // إرسال الوصف أيضاً
    
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    if(res.ok) {
        status.innerText = "تم الرفع بنجاح!";
    } else {
        status.innerText = "حدث خطأ أثناء الرفع.";
    }
}
</script>
