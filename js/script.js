// Claves para localStorage
const STORAGE_KEY_PRODUCTS = 'pksKidsProductos';
const STORAGE_KEY_CART = 'pksKidsCarrito';
const STORAGE_KEY_LAST_ID = 'pksKidsLastId';
const STORAGE_KEY_WHATSAPP = 'pksKidsWhatsapp';
const STORAGE_KEY_SALES = 'pksKidsVentas';
const STORAGE_KEY_STORE_CONFIG = 'pksKidsConfigTienda';

// Credenciales de admin
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

// Obtener configuración de tienda
function getStoreConfig() {
    const saved = localStorage.getItem(STORAGE_KEY_STORE_CONFIG);
    if (saved) {
        return JSON.parse(saved);
    } else {
        const defaultConfig = {
            name: "PKS Kids",
            logo: "img/logo.png"
        };
        localStorage.setItem(STORAGE_KEY_STORE_CONFIG, JSON.stringify(defaultConfig));
        return defaultConfig;
    }
}

// Guardar configuración de tienda
function saveStoreConfig(config) {
    localStorage.setItem(STORAGE_KEY_STORE_CONFIG, JSON.stringify(config));
    updateStoreUI(); // Actualizar UI inmediatamente
}

// Obtener historial de ventas
function getSalesHistory() {
    const saved = localStorage.getItem(STORAGE_KEY_SALES);
    return saved ? JSON.parse(saved) : [];
}

// Guardar historial de ventas
function saveSalesHistory(sales) {
    localStorage.setItem(STORAGE_KEY_SALES, JSON.stringify(sales));
}

// Obtener productos
function getProducts() {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (saved) {
        return JSON.parse(saved);
    } else {
        const initialProducts = [
            {
                id: 1,
                name: "Remera Dinosaurio",
                category: "remeras",
                price: 29.99,
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                sold: false,
                discount: 0,
                description: "Remera de algodón 100%, estampado de dinosaurio.",
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: "Pantalón Estrellitas",
                category: "pantalones",
                price: 35.50,
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                sold: false,
                discount: 0,
                description: "Pantalón con estampado de estrellas, elástico en cintura.",
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                name: "Conjunto Unicornio",
                category: "conjuntos",
                price: 79.90,
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                sold: false,
                discount: 0,
                description: "Conjunto de remera y pantalón con diseño de unicornio.",
                createdAt: new Date().toISOString()
            },
            {
                id: 4,
                name: "Gorro de Oso",
                category: "accesorios",
                price: 22.99,
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                sold: false,
                discount: 0,
                description: "Gorro de invierno con orejas de oso, interior polar.",
                createdAt: new Date().toISOString()
            },
            {
                id: 5,
                name: "Remera Superhéroe",
                category: "remeras",
                price: 32.99,
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                sold: false,
                discount: 0,
                description: "Remera con estampado de superhéroe, ideal para aventuras.",
                createdAt: new Date().toISOString()
            },
            {
                id: 6,
                name: "Mochila de Princesa",
                category: "accesorios",
                price: 45.00,
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                sold: false,
                discount: 0,
                description: "Mochila con diseño de princesa, compartimentos internos.",
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(initialProducts));
        localStorage.setItem(STORAGE_KEY_LAST_ID, '6');
        return initialProducts;
    }
}

// Guardar productos
function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
}

// Obtener carrito
function getCart() {
    const saved = localStorage.getItem(STORAGE_KEY_CART);
    return saved ? JSON.parse(saved) : [];
}

// Guardar carrito
function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
}

// Obtener WhatsApp
function getWhatsappNumber() {
    return localStorage.getItem(STORAGE_KEY_WHATSAPP) || '+59895430818';
}

// Guardar WhatsApp
function saveWhatsappNumber(number) {
    localStorage.setItem(STORAGE_KEY_WHATSAPP, number);
}

// Variables globales
let products = getProducts();
let cart = getCart();

// Actualizar UI de tienda (nombre y logo)
function updateStoreUI() {
    const config = getStoreConfig();
    const brandName = document.querySelector('.brand-name');
    const logoImg = document.querySelector('.navbar-brand img');

    if (brandName) brandName.textContent = config.name;
    if (logoImg) logoImg.src = config.logo;
}

// Renderizar productos (catálogo público)
function renderProducts(filteredProducts = products) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (filteredProducts.length === 0) {
        container.innerHTML = `<div class="col-12"><div class="alert alert-info">No se encontraron productos.</div></div>`;
        return;
    }

    filteredProducts.forEach(product => {
        const discountPrice = product.price * (1 - product.discount / 100);
        const finalPrice = product.discount > 0 ? discountPrice : product.price;

        const inCart = cart.some(item => item.id === product.id);

        const card = document.createElement('div');
        card.className = 'col-md-4 col-sm-6';
        card.innerHTML = `
            <div class="card position-relative h-100">
                ${product.sold ? '<div class="sold-out-overlay">AGOTADO</div>' : ''}
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 250px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    ${product.description ? `<p class="text-muted small">${product.description}</p>` : ''}
                    <p class="card-text">
                        <span class="badge bg-secondary">${product.category}</span>
                        ${product.discount > 0 ? `<span class="badge badge-offer">-${product.discount}%</span>` : ''}
                    </p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            ${product.discount > 0 ? `<span class="price-original">$${product.price.toFixed(2)}</span>` : ''}
                            <strong>$${finalPrice.toFixed(2)}</strong>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-buy w-100 ${product.sold || inCart ? 'disabled' : ''}" 
                                data-id="${product.id}" ${product.sold || inCart ? 'disabled' : ''}>
                                <i class="fas fa-shopping-cart"></i> ${inCart ? 'En carrito' : 'Agregar al carrito'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    document.querySelectorAll('.btn-buy:not(.disabled)').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    updateCartCount();
}

// Agregar al carrito
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);

    if (!product || product.sold) {
        Swal.fire('Oops', 'Producto no disponible.', 'error');
        return;
    }

    cart.push({...product});
    saveCart(cart);
    renderProducts();
    updateCartCount();
    Swal.fire('Agregado', `${product.name} añadido al carrito.`, 'success');
}

// Actualizar contador del carrito
function updateCartCount() {
    const count = document.getElementById('cartCount');
    if (count) count.textContent = cart.length;
}

// Renderizar carrito
function renderCart() {
    const container = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    if (!container || !totalElement) return;

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-center">Tu carrito está vacío.</p>`;
        totalElement.textContent = '$0.00';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map((item, index) => {
        const finalPrice = item.price * (1 - item.discount / 100);
        total += finalPrice;

        return `
            <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                <div>
                    <strong>${item.name}</strong><br>
                    $${finalPrice.toFixed(2)} ${item.discount > 0 ? `<small class="text-muted">(antes $${item.price.toFixed(2)})</small>` : ''}
                </div>
                <button class="btn btn-sm btn-danger" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    totalElement.textContent = `$${total.toFixed(2)}`;

    document.querySelectorAll('#cartItems .btn-danger').forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
}

// Eliminar del carrito
function removeFromCart(event) {
    const index = parseInt(event.target.closest('.btn').getAttribute('data-index'));
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    renderProducts();
    updateCartCount();
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        Swal.fire('Carrito vacío', 'Agrega productos antes de finalizar.', 'warning');
        return;
    }

    const productsUpdated = getProducts();
    const unavailable = cart.filter(item => {
        const current = productsUpdated.find(p => p.id === item.id);
        return current?.sold;
    });

    if (unavailable.length > 0) {
        Swal.fire('Productos no disponibles', 
            `Los siguientes productos ya fueron vendidos:\n${unavailable.map(p => `- ${p.name}`).join('\n')}`,
            'error'
        );
        cart = cart.filter(item => !unavailable.some(u => u.id === item.id));
        saveCart(cart);
        renderCart();
        renderProducts();
        updateCartCount();
        return;
    }

    Swal.fire({
        title: 'Finalizar Compra',
        html: `
            <input id="swal-name" class="swal2-input" placeholder="Nombre completo">
            <input id="swal-address" class="swal2-input" placeholder="Dirección de envío">
            <input id="swal-phone" class="swal2-input" placeholder="Teléfono (Ej: 099123456)">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Enviar pedido por WhatsApp',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const name = document.getElementById('swal-name').value;
            const address = document.getElementById('swal-address').value;
            const phone = document.getElementById('swal-phone').value;

            if (!name || !address || !phone) {
                Swal.showValidationMessage('Por favor completa todos los campos');
                return false;
            }

            return { name, address, phone };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { name, address, phone } = result.value;

            let total = 0;
            const itemsList = cart.map(item => {
                const finalPrice = item.price * (1 - item.discount / 100);
                total += finalPrice;
                return `• ${item.name} - $${finalPrice.toFixed(2)}`;
            }).join('%0A');

            const config = getStoreConfig();
            const message = `
Hola, quiero hacer un pedido en ${config.name}.%0A
%0A
*DATOS DEL CLIENTE*%0A
Nombre: ${name}%0A
Dirección: ${address}%0A
Teléfono: ${phone}%0A
%0A
*PRODUCTOS SELECCIONADOS*%0A
${itemsList}%0A
%0A
*TOTAL A PAGAR: $${total.toFixed(2)}*%0A
%0A
¡Gracias! Espero su confirmación para vestir con amor a mi peque 🧸
            `.trim();

            const whatsappNumber = getWhatsappNumber();
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            // Registrar venta
            const sale = {
                id: Date.now(),
                date: new Date().toLocaleString(),
                customer: { name, address, phone },
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    discount: item.discount
                })),
                total: total
            };

            const salesHistory = getSalesHistory();
            salesHistory.push(sale);
            saveSalesHistory(salesHistory);

            // Marcar productos como vendidos
            cart.forEach(cartItem => {
                const index = products.findIndex(p => p.id === cartItem.id);
                if (index !== -1) {
                    products[index].sold = true;
                }
            });

            saveProducts(products);
            cart = [];
            saveCart(cart);

            renderProducts();
            updateCartCount();

            window.open(whatsappUrl, '_blank');

            Swal.fire('¡Pedido enviado!', 'Hemos abierto WhatsApp para que confirmes tu pedido.', 'success');
        }
    });
}

// Filtros
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    const filtered = products.filter(product => {
        const finalPrice = product.price * (1 - product.discount / 100);
        return (
            (category === '' || product.category === category) &&
            finalPrice >= minPrice &&
            finalPrice <= maxPrice
        );
    });

    renderProducts(filtered);
}

// Restablecer filtros
document.getElementById('resetFilters')?.addEventListener('click', () => {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';

    Swal.fire({
        title: '🔐 ¿Quitar todos los descuentos?',
        text: 'Esta acción requiere contraseña de administrador.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, quitar descuentos',
        cancelButtonText: 'Cancelar',
        input: 'password',
        inputLabel: 'Contraseña de administrador',
        inputPlaceholder: 'Ingresa la contraseña',
        preConfirm: (password) => {
            if (password !== ADMIN_PASS) {
                Swal.showValidationMessage('❌ Contraseña incorrecta');
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            products = products.map(p => {
                if (!p.sold) p.discount = 0;
                return p;
            });
            saveProducts(products);
            renderProducts();
            Swal.fire('✅ Descuentos removidos', 'Todos los descuentos han sido eliminados.', 'success');
        }
    });
});

// Eventos de filtros
document.getElementById('categoryFilter')?.addEventListener('change', filterProducts);
document.getElementById('minPrice')?.addEventListener('input', filterProducts);
document.getElementById('maxPrice')?.addEventListener('input', filterProducts);

// Evento para abrir el carrito
document.getElementById('cartButton')?.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    renderCart();
    modal.show();
});

// Evento para finalizar compra
document.getElementById('checkoutButton')?.addEventListener('click', checkout);

// ========================
// PANEL DE ADMINISTRACIÓN
// ========================

// Abrir modal de login
document.getElementById('adminLoginBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const loginModal = new bootstrap.Modal(document.getElementById('adminLoginModal'));
    loginModal.show();
});

// Login de admin
document.getElementById('adminLoginSubmit')?.addEventListener('click', () => {
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        bootstrap.Modal.getInstance(document.getElementById('adminLoginModal')).hide();
        const panelModal = new bootstrap.Modal(document.getElementById('adminPanelModal'));
        renderAdminPanel();
        panelModal.show();
    } else {
        Swal.fire('Error', 'Usuario o contraseña incorrectos.', 'error');
    }
});

// Renderizar panel de admin
function renderAdminPanel() {
    renderAdminProducts();
    renderOldProducts();
    renderWhatsappSettings();
    renderSalesHistory();
    renderStoreConfig();
}

// Renderizar productos en admin
function renderAdminProducts() {
    const container = document.getElementById('adminProductsList');
    if (!container) return;

    container.innerHTML = products.map(product => {
        const daysOld = Math.floor((new Date() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24));
        return `
            <div class="col-md-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" style="height: 150px; object-fit: cover;">
                    <div class="card-body">
                        <h6 class="card-title">${product.name}</h6>
                        ${product.description ? `<p class="text-muted small">${product.description}</p>` : ''}
                        <p class="card-text">
                            <small class="text-muted">Categoría: ${product.category}</small><br>
                            <strong>$${product.price.toFixed(2)}</strong>
                            ${product.discount > 0 ? `<span class="badge bg-warning">-${product.discount}%</span>` : ''}
                            ${product.sold ? `<span class="badge bg-danger">VENDIDO</span>` : ''}
                            <br>
                            <small>Días en stock: ${daysOld}</small>
                        </p>
                        <div class="d-grid gap-2">
                            ${!product.sold && product.discount === 0 ? `
                            <button class="btn btn-sm btn-warning admin-apply-discount" data-id="${product.id}">
                                <i class="fas fa-tag"></i> Aplicar 20% OFF
                            </button>` : ''}
                            ${!product.sold && product.discount > 0 ? `
                            <button class="btn btn-sm btn-outline-secondary admin-remove-discount" data-id="${product.id}">
                                <i class="fas fa-undo"></i> Quitar Descuento
                            </button>` : ''}
                            ${!product.sold ? `
                            <button class="btn btn-sm btn-outline-danger admin-delete-product" data-id="${product.id}">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Aplicar descuento
    document.querySelectorAll('.admin-apply-discount').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const index = products.findIndex(p => p.id === id);
            if (index !== -1) {
                products[index].discount = 20;
                saveProducts(products);
                renderAdminPanel();
                renderProducts();
                Swal.fire('✅ Oferta aplicada', '', 'success');
            }
        });
    });

    // Quitar descuento
    document.querySelectorAll('.admin-remove-discount').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const index = products.findIndex(p => p.id === id);
            if (index !== -1) {
                products[index].discount = 0;
                saveProducts(products);
                renderAdminPanel();
                renderProducts();
                Swal.fire('ℹ️ Descuento removido', '', 'info');
            }
        });
    });

    // Eliminar producto
    document.querySelectorAll('.admin-delete-product').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            Swal.fire({
                title: '¿Eliminar producto?',
                text: "¡Esta acción no se puede deshacer!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    products = products.filter(p => p.id !== id);
                    saveProducts(products);
                    renderAdminPanel();
                    renderProducts();
                    Swal.fire('Eliminado', 'Producto eliminado.', 'success');
                }
            });
        });
    });
}

// Renderizar productos antiguos
function renderOldProducts() {
    const container = document.getElementById('oldProductsList');
    if (!container) return;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const oldProducts = products.filter(p => 
        !p.sold && 
        new Date(p.createdAt) < thirtyDaysAgo
    );

    if (oldProducts.length === 0) {
        container.innerHTML = `<div class="col-12"><div class="alert alert-info">No hay productos antiguos sin vender.</div></div>`;
        return;
    }

    container.innerHTML = oldProducts.map(product => {
        const daysOld = Math.floor((new Date() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24));
        return `
            <div class="col-md-4">
                <div class="card h-100 border-warning">
                    <img src="${product.image}" class="card-img-top" style="height: 150px; object-fit: cover;">
                    <div class="card-body">
                        <h6 class="card-title">${product.name}</h6>
                        ${product.description ? `<p class="text-muted small">${product.description}</p>` : ''}
                        <p class="card-text">
                            <small class="text-muted">Días sin vender: ${daysOld}</small><br>
                            <strong>$${product.price.toFixed(2)}</strong>
                            ${product.discount > 0 ? `<span class="badge bg-warning">-${product.discount}%</span>` : ''}
                        </p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-sm btn-warning admin-apply-discount-old" data-id="${product.id}">
                                Aplicar 30% OFF
                            </button>
                            <button class="btn btn-sm btn-danger admin-apply-liquidation" data-id="${product.id}">
                                Liquidar (50% OFF)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Aplicar 30% OFF
    document.querySelectorAll('.admin-apply-discount-old').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const index = products.findIndex(p => p.id === id);
            if (index !== -1) {
                products[index].discount = 30;
                saveProducts(products);
                renderAdminPanel();
                renderProducts();
                Swal.fire('🔥 Oferta aplicada', '30% de descuento activado.', 'success');
            }
        });
    });

    // Aplicar 50% OFF
    document.querySelectorAll('.admin-apply-liquidation').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const index = products.findIndex(p => p.id === id);
            if (index !== -1) {
                products[index].discount = 50;
                saveProducts(products);
                renderAdminPanel();
                renderProducts();
                Swal.fire('💥 ¡LIQUIDACIÓN!', '50% de descuento activado.', 'success');
            }
        });
    });
}

// Aplicar descuento masivo
document.getElementById('applyDiscountToOld')?.addEventListener('click', () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let count = 0;
    products = products.map(p => {
        if (!p.sold && new Date(p.createdAt) < thirtyDaysAgo) {
            p.discount = 30;
            count++;
        }
        return p;
    });

    if (count > 0) {
        saveProducts(products);
        renderAdminPanel();
        renderProducts();
        Swal.fire('✅ Ofertas aplicadas', `${count} productos con 30% OFF.`, 'success');
    } else {
        Swal.fire('ℹ️ Info', 'No hay productos elegibles.', 'info');
    }
});

// Aplicar liquidación masiva
document.getElementById('applyLiquidationToOld')?.addEventListener('click', () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let count = 0;
    products = products.map(p => {
        if (!p.sold && new Date(p.createdAt) < thirtyDaysAgo) {
            p.discount = 50;
            count++;
        }
        return p;
    });

    if (count > 0) {
        saveProducts(products);
        renderAdminPanel();
        renderProducts();
        Swal.fire('💥 ¡LIQUIDACIÓN MASIVA!', `${count} productos con 50% OFF.`, 'success');
    } else {
        Swal.fire('ℹ️ Info', 'No hay productos elegibles.', 'info');
    }
});

// Agregar nuevo producto (con imagen base64)
document.getElementById('addProductForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const category = formData.get('category');
    const price = parseFloat(formData.get('price'));
    const description = formData.get('description') || '';
    const imageFile = formData.get('productImage');

    if (!name || !category || isNaN(price) || !imageFile) {
        Swal.fire('Error', 'Completa todos los campos correctamente.', 'error');
        return;
    }

    try {
        const base64Image = await readFileAsBase64(imageFile);

        let lastId = parseInt(localStorage.getItem(STORAGE_KEY_LAST_ID) || '0');
        lastId++;
        localStorage.setItem(STORAGE_KEY_LAST_ID, lastId.toString());

        const newProduct = {
            id: lastId,
            name,
            category,
            price,
            image: base64Image,
            sold: false,
            discount: 0,
            description: description,
            createdAt: new Date().toISOString()
        };

        products.push(newProduct);
        saveProducts(products);
        renderAdminPanel();
        renderProducts();

        this.reset();

        Swal.fire('✅ Producto agregado', `¡${name} está listo para venderse!`, 'success');
    } catch (error) {
        Swal.fire('Error', 'No se pudo leer la imagen. Intenta con otro archivo.', 'error');
    }
});

// Función para leer archivo como base64
function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Renderizar historial de ventas
function renderSalesHistory() {
    const container = document.getElementById('salesHistoryList');
    if (!container) return;

    const sales = getSalesHistory();

    if (sales.length === 0) {
        container.innerHTML = `<div class="alert alert-info">No hay ventas registradas aún.</div>`;
        return;
    }

    container.innerHTML = sales.reverse().map(sale => {
        const itemsList = sale.items.map(item => 
            `<li>${item.name} - $${(item.price * (1 - item.discount/100)).toFixed(2)}</li>`
        ).join('');

        return `
            <div class="card mb-3">
                <div class="card-header bg-light">
                    <strong>Venta #${sale.id}</strong> - ${sale.date}
                </div>
                <div class="card-body">
                    <p><strong>Cliente:</strong> ${sale.customer.name}</p>
                    <p><strong>Teléfono:</strong> ${sale.customer.phone}</p>
                    <p><strong>Dirección:</strong> ${sale.customer.address}</p>
                    <p><strong>Total:</strong> $${sale.total.toFixed(2)}</p>
                    <ul>${itemsList}</ul>
                </div>
            </div>
        `;
    }).join('');
}

// Renderizar configuración de WhatsApp
function renderWhatsappSettings() {
    const currentNumber = getWhatsappNumber();
    const displayElement = document.getElementById('currentWhatsappNumber');
    if (displayElement) {
        displayElement.textContent = currentNumber;
    }

    const form = document.getElementById('whatsappConfigForm');
    if (form) {
        document.getElementById('whatsappNumber').value = currentNumber;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const newNumber = document.getElementById('whatsappNumber').value.trim();

            if (!newNumber.startsWith('+') || !/^\+\d{8,}$/.test(newNumber)) {
                Swal.fire('Error', 'El número debe empezar con + y tener al menos 8 dígitos.', 'error');
                return;
            }

            saveWhatsappNumber(newNumber);
            renderWhatsappSettings();
            Swal.fire('✅ ¡Número actualizado!', `Los pedidos se enviarán a ${newNumber}`, 'success');
        });
    }
}

// Renderizar configuración de tienda
function renderStoreConfig() {
    const config = getStoreConfig();
    const nameInput = document.getElementById('storeName');
    const currentName = document.getElementById('currentStoreName');
    const currentLogo = document.getElementById('currentStoreLogo');

    if (nameInput) nameInput.value = config.name;
    if (currentName) currentName.textContent = config.name;
    if (currentLogo) currentLogo.src = config.logo;

    const form = document.getElementById('storeConfigForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const newName = document.getElementById('storeName').value.trim();
            const logoFile = document.getElementById('storeLogo').files[0];

            if (!newName) {
                Swal.fire('Error', 'El nombre de la tienda es obligatorio.', 'error');
                return;
            }

            let newLogo = config.logo;
            if (logoFile) {
                try {
                    newLogo = await readFileAsBase64(logoFile);
                } catch (error) {
                    Swal.fire('Error', 'No se pudo leer el logo. Intenta con otro archivo.', 'error');
                    return;
                }
            }

            const newConfig = {
                name: newName,
                logo: newLogo
            };

            saveStoreConfig(newConfig);
            Swal.fire('✅ ¡Configuración guardada!', 'La tienda ha sido actualizada.', 'success');
        });
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    updateStoreUI(); // Aplicar configuración de tienda al cargar
    renderProducts();
    updateCartCount();

    const currentProducts = getProducts();
    let changed = false;
    cart = cart.filter(item => {
        const current = currentProducts.find(p => p.id === item.id);
        if (!current || current.sold) {
            changed = true;
            return false;
        }
        return true;
    });

    if (changed) {
        saveCart(cart);
        updateCartCount();
    }
});