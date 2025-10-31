# Base HTML-SCSS Template

Template chuẩn cho các dự án HTML/SCSS, với cấu trúc modular và responsive design.

## 📁 Cấu trúc thư mục

```
base-html-scss/
├── index.html              # Landing page
├── package.json            # Dependencies
├── README.md               # File này
├── COMPONENT_NAMING_GUIDE.md  # Hướng dẫn đặt tên components
└── common/
    ├── css/               # CSS compiled từ SCSS
    ├── img/               # Images, icons, SVGs
    ├── js/                # JavaScript files
    └── scss/              # SCSS source files
        ├── main.scss         # Import tất cả
        ├── _variables.scss   # Biến (colors, fonts...)
        ├── _mixins.scss      # Mixins & functions
        ├── _base.scss        # CSS reset & base
        ├── _components.scss  # UI components
        ├── _layout.scss      # Layout styles
        ├── _utilities.scss   # Utility classes
        ├── custom.scss       # Custom styles
        └── _components-example.scss  # Ví dụ về BEM
```

## 🚀 Quick Start

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Compile SCSS

**Development mode (watch):**
```bash
npm run sass
```

**Production mode (minified):**
```bash
npm run sass-build
```

### 3. Mở file HTML

Mở `index.html` trong browser để xem kết quả.

## 📱 Breakpoints

```scss
xs:      320px
mobile:  375px  ← Mới thêm!
sm:      640px
md:      768px
lg:      1024px
xl:      1280px
2xl:     1536px
```

### Cách sử dụng:

```scss
.my-component {
  padding: $spacing-4;
  
  // Mobile (375px+)
  @include respond-to(mobile) {
    padding: $spacing-6;
  }
  
  // Tablet (768px+)
  @include respond-to(md) {
    padding: $spacing-8;
  }
  
  // Desktop (1024px+)
  @include respond-to(lg) {
    padding: $spacing-12;
  }
}
```

## 🎨 Naming Convention

### Vấn đề hiện tại

Components đang được đặt tên theo **dự án cụ thể** (sustainability theme):

```scss
.cherish { }
.earth-friendly { }
.action-item { }
```

### Giải pháp: BEM Naming

```scss
// Generic & Reusable
.section { }
.card { }
.btn { }
.grid { }

// Elements
.card__title { }
.card__content { }

// Modifiers
.card--feature { }
.card--compact { }
.btn--primary { }
```

Xem chi tiết trong: **[COMPONENT_NAMING_GUIDE.md](./COMPONENT_NAMING_GUIDE.md)**

## 📋 Components có sẵn

### 1. Section Components

```scss
.section              // Base section
.section--primary    // Background primary color
.section__container  // Container max-width
.section__header     // Header area
.section__title       // Title
.section__description // Description
```

### 2. Card Component

```scss
.card              // Base card
.card--feature     // Feature card
.card--compact     // Compact card
.card__header      // Card header
.card__image       // Card image
.card__title       // Card title
.card__content     // Card content
.card__footer      // Card footer
```

### 3. Button Component

```scss
.btn                // Base button
.btn--primary       // Primary button
.btn--secondary     // Secondary button
.btn--large         // Large button
.btn--small         // Small button
```

### 4. Grid Component

```scss
.grid                    // Base grid
.grid--2                 // 2 columns
.grid--3                 // 3 columns
.grid--4                 // 4 columns
.grid--responsive        // 1→2→3 responsive
.grid--tight             // Smaller gap
.grid--loose             // Larger gap
```

### 5. Icon Component

```scss
.icon               // Base icon
.icon--xs          // Extra small (16px)
.icon--sm          // Small (20px)
.icon--md          // Medium (24px)
.icon--lg          // Large (32px)
.icon--xl          // Extra large (48px)
```

## 🛠️ Customization

### 1. Change Colors

Edit `_variables.scss`:

```scss
$color-primary: #38923D;        // Your primary color
$color-secondary: #C5982A;     // Your secondary color
```

### 2. Change Fonts

Edit `_variables.scss`:

```scss
$font-family-primary: 'Your Font', sans-serif;
$font-family-heading: 'Your Heading Font', serif;
```

### 3. Add Custom Components

Create in `custom.scss`:

```scss
.my-custom-component {
  // Your styles here
  @include respond-to(md) {
    // Responsive styles
  }
}
```

### 4. Override Existing Components

Edit `custom.scss`:

```scss
.hero {
  &__title {
    font-size: 3rem; // Override
  }
}
```

## 🎯 Features

✅ SCSS modular architecture  
✅ Mobile-first responsive design  
✅ BEM naming convention (recommended)  
✅ Utility classes system  
✅ Mixins & functions  
✅ Color & font variables  
✅ Component-based structure  
✅ Animations & transitions  
✅ Accessibility features  
✅ SEO optimized  

## 📝 NPM Scripts

```bash
# Watch SCSS changes
npm run sass

# Build for production (minified)
npm run sass-build

# Custom SCSS (if needed)
npm run sass-custom
npm run sass-build-custom
```

## 📖 Documentation

- **Component Naming Guide**: [COMPONENT_NAMING_GUIDE.md](./COMPONENT_NAMING_GUIDE.md)
- **Example Components**: [common/scss/_components-example.scss](./common/scss/_components-example.scss)
- **SCSS Variables**: [common/scss/_variables.scss](./common/scss/_variables.scss)
- **Mixins**: [common/scss/_mixins.scss](./common/scss/_mixins.scss)

## 💡 Best Practices

1. **Mobile-first**: Code cho mobile trước, enhance cho desktop
2. **Reusable Components**: Đặt tên generic, không gắn với dự án cụ thể
3. **Use Variables**: Dùng variables thay vì hardcode values
4. **BEM Naming**: Block__Element--Modifier
5. **Mixins**: Dùng mixins cho code ngắn gọn hơn
6. **Utility Classes**: Ưu tiên dùng utility classes khi có thể

## 🔄 Cấu trúc Components nên tái sử dụng

### Hero Section

```html
<section class="hero">
  <div class="hero__background">...</div>
  <div class="hero__content">
    <h1 class="hero__title">...</h1>
    <p class="hero__description">...</p>
    <a href="#" class="hero__cta btn btn--primary">...</a>
  </div>
</section>
```

### Card Grid

```html
<div class="section">
  <div class="section__container">
    <div class="section__header">
      <h2 class="section__title">...</h2>
    </div>
    <div class="grid grid--responsive">
      <div class="grid__item">
        <article class="card card--feature">
          <img src="..." class="card__image">
          <h3 class="card__title">...</h3>
          <div class="card__content">...</div>
        </article>
      </div>
    </div>
  </div>
</div>
```

## 📞 Support

Nếu có câu hỏi hoặc cần hỗ trợ, vui lòng xem:
- README này
- COMPONENT_NAMING_GUIDE.md
- Code comments trong các file SCSS

## 📄 License

Copyright © SEIBU PRINCE HOTELS WORLDWIDE INC. All rights reserved.

