
document.addEventListener('DOMContentLoaded', () => {
    // === 1. تعريف العناصر الأساسية ===
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const foldersView = document.getElementById('foldersView');
    const readerView = document.getElementById('readerView');
    const backBtn = document.getElementById('back-btn');
    const folderItems = document.querySelectorAll('.folder-item');
    const menuTriggers = document.querySelectorAll('.menu-trigger');
    
    // === 2. نظام التبديل بين الوضع الليلي والنهاري ===
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        const moon = themeToggle.querySelector('.fa-moon');
        const sun = themeToggle.querySelector('.fa-sun');
        if (moon && sun) {
            moon.classList.toggle('hidden');
            sun.classList.toggle('hidden');
            sun.classList.toggle('dark:block');
        }
    });

    // === 3. نظام SPA: التبديل بين المجلدات والقارئ ===
    // الدخول للقارئ عند الضغط على المجلد
    folderItems.forEach(folder => {
        folder.addEventListener('click', (e) => {
            // منع الدخول إذا تم الضغط على قائمة الـ 3 نقاط
            if(!e.target.closest('.menu-trigger') && !e.target.closest('.folder-menu')) {
                foldersView.classList.add('hidden');
                readerView.classList.remove('hidden');
                readerView.classList.add('flex');
            }
        });
    });

    // الرجوع للمجلدات
    backBtn.addEventListener('click', () => {
        readerView.classList.add('hidden');
        readerView.classList.remove('flex');
        foldersView.classList.remove('hidden');
    });

    // === 4. إدارة القوائم المنبثقة (Dropdown Menus) ===
    menuTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation(); // منع انتقال النقر للمجلد نفسه
            
            // إغلاق أي قائمة أخرى مفتوحة
            document.querySelectorAll('.folder-menu').forEach(menu => {
                if(menu !== trigger.nextElementSibling) {
                    menu.classList.add('hidden');
                    menu.classList.remove('flex');
                }
            });
            
            // تبديل حالة القائمة الحالية (فتح/إغلاق)
            const menu = trigger.nextElementSibling;
            if(menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                menu.classList.add('flex');
            } else {
                menu.classList.add('hidden');
                menu.classList.remove('flex');
            }
        });
    });
    
    // إغلاق القوائم عند النقر في أي مكان فارغ بالشاشة
    document.addEventListener('click', () => {
        document.querySelectorAll('.folder-menu').forEach(menu => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
        });
    });

    // === 5. أدوات تنسيق النصوص (Word Toolbar) ===
    const formatButtons = document.querySelectorAll('#format-toolbar button[data-command]');
    formatButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // منع الزر من سحب التركيز
            const command = button.getAttribute('data-command');
            // تنفيذ أمر التنسيق على النص المحدد
            document.execCommand(command, false, null);
            // إعادة التركيز على المحرر
            document.getElementById('main-editor').focus();
        });
    });

    // === 6. إدراج صفحات جديدة (ملاحظات، فارغة، الخ) ===
    const addPageBtns = document.querySelectorAll('.add-page-btn');
    const pdfContainer = document.getElementById('pdf-container');
    
    addPageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            const newPage = document.createElement('div');
            
            // التنسيق الأساسي للصفحة الجديدة
            newPage.className = 'pdf-page p-12 outline-none font-serif text-lg mt-8 relative shadow-lg transition-all duration-300';
            newPage.contentEditable = 'true';
            
            // تخصيص شكل الصفحة حسب النوع
            if(type === 'note') {
                newPage.style.backgroundColor = '#fef08a'; // لون الملاحظة الصفراء
                newPage.style.minHeight = '400px';
                newPage.innerHTML = '<p class="text-gray-800 font-bold text-xl mb-4">ملاحظاتي:</p><p><br></p>';
            } else {
                newPage.innerHTML = '<p><br></p>'; // صفحة A4 بيضاء فارغة
            }
            
            pdfContainer.appendChild(newPage);
            // التمرير التلقائي للصفحة الجديدة
            newPage.scrollIntoView({ behavior: 'smooth' });
            newPage.focus();
        });
    });

    // === 7. فتح وإغلاق نافذة المساعد الذكي (Gemini) ===
    const geminiToggleBtn = document.getElementById('gemini-toggle-btn');
    const closeGeminiBtn = document.getElementById('close-gemini-btn');
    const geminiChatPanel = document.getElementById('gemini-chat-panel');

    const toggleChat = () => {
        geminiChatPanel.classList.toggle('opacity-0');
        geminiChatPanel.classList.toggle('pointer-events-none');
        geminiChatPanel.classList.toggle('scale-95');
        
        geminiChatPanel.classList.toggle('opacity-100');
        geminiChatPanel.classList.toggle('scale-100');
    };

    if (geminiToggleBtn && closeGeminiBtn) {
        geminiToggleBtn.addEventListener('click', toggleChat);
        closeGeminiBtn.addEventListener('click', toggleChat);
    }
});
