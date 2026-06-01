export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    const file = formData.get("file");
    
    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    // رفع الصورة إلى R2 (يستخدم الربط الذي أعددناه مسبقاً)
    const key = Date.now() + "-" + file.name;
    await context.env.MY_BUCKET.put(key, file);

    // إرجاع رابط الصورة (قم بتعديل النطاق لاحقاً إذا لزم الأمر)
    return new Response(JSON.stringify({ url: `https://amdadsteel.com/uploads/${key}` }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
