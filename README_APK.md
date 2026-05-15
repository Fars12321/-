# 📱 دليل إنشاء APK - المسبحة الذكية

## ✨ ما تم إضافته:

- ✅ **Capacitor Integration** - لتحويل تطبيق الويب إلى تطبيق أندرويد محلي
- ✅ **Mobile Haptics** - اهتزازات تفاعلية مخصصة
- ✅ **Back Button Handler** - معالج زر الرجوع في Android
- ✅ **App Lifecycle** - تتبع دورة حياة التطبيق
- ✅ **Gradle Configuration** - إعدادات بناء محسّنة

---

## 🚀 البدء السريع

### المتطلبات:
- ✅ Node.js مثبت
- ✅ Java JDK 11+ مثبت
- ✅ Android Studio مثبت
- ✅ Android SDK مثبت

### الخطوات:

```bash
# 1. تثبيت المكتبات
npm install

# 2. بناء تطبيق الويب
npm run build

# 3. إضافة منصة Android (أول مرة فقط)
npx cap add android

# 4. مزامنة الملفات
npx cap sync android

# 5. فتح في Android Studio
npx cap open android
```

---

## 🛠️ بناء APK

### من Android Studio (الطريقة الموصى بها):

1. بعد تشغيل `npx cap open android`
2. اذهب إلى: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. اختر **Debug** لتطبيق اختبار أو **Release** للنشر
4. انتظر اكتمال البناء

### من سطر الأوامر:

```bash
# Debug APK
cd android
./gradlew assembleDebug
cd ..

# Release APK
cd android
./gradlew assembleRelease
cd ..
```

---

## 📍 موقع الملفات

```
📦 مشروعك
├── android/
│   └── app/build/outputs/apk/
│       ├── debug/
│       │   └── app-debug.apk  ← ملف الاختبار
│       └── release/
│           └── app-release.apk ← ملف النشر
```

---

## 📲 تثبيت على الهاتف

### على جهاز فعلي:

1. **فعّل Developer Mode**:
   - افتح الإعدادات
   - اذهب إلى "حول الهاتف"
   - اضغط على "رقم البناء" 7 مرات

2. **فعّل USB Debugging**:
   - العودة للإعدادات
   - اختر "خيارات المطور"
   - فعّل "تصحيح USB"

3. **وصّل الهاتف وثبّت**:
   ```bash
   # من داخل مجلد android
   adb install -r app/build/outputs/apk/debug/app-debug.apk
   ```

### أو ببساطة:
- انسخ ملف APK إلى هاتفك
- اضغط عليه مباشرة من مدير الملفات
- اتبع الخطوات

---

## 🎨 مميزات التطبيق:

- 🟡 **8 ثيمات جميلة** - ذهبي، نيون، طبيعة، وغيرها
- 🔊 **أصوات وموسيقى** - مخصصة حسب اختيارك
- 📳 **اهتزازات** - ردود فعل لمسية قوية
- 🌙 **دعم وضع ليلي** - سهل على العين
- 📊 **إحصائيات** - تتبع تقدمك
- ⚙️ **إعدادات متقدمة** - تخصيص كامل

---

## 🔧 استكشاف الأخطاء

### مشكلة: "Capacitor not initialized"
```bash
npx cap add android
npx cap sync android
```

### مشكلة: "Android SDK not found"
```bash
# تأكد من تثبيت Android Studio و SDK
# وتعيين ANDROID_HOME بشكل صحيح
```

### مشكلة: "Gradle build failed"
```bash
cd android
./gradlew clean
./gradlew build
cd ..
```

---

## 📚 المراجع:

- [Capacitor Docs](https://capacitorjs.com/)
- [Android Developers](https://developer.android.com/)
- [Google Play Store](https://play.google.com/console)

---

## 💡 نصائح:

1. **دائمًا بناء الويب أولاً**:
   ```bash
   npm run build
   ```

2. **مزامنة قبل الفتح**:
   ```bash
   npx cap sync android
   ```

3. **استخدم الأوامر المختصرة**:
   ```bash
   npm run cap:build      # بناء سريع
   npm run cap:sync       # مزامنة سريعة
   npm run android:build  # بناء Android كامل
   ```

---

**استمتع ببناء تطبيقك! 🎉**

لأي استفسارات، راجع دليل `SETUP_ANDROID.md` الكامل.
