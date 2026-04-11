"use client"
import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Shield, Calendar, Phone, Mail, ExternalLink, Search } from "lucide-react";

const BRAND = {
  name: "AminoPro-MD",
  tagline: "Peptides • Fitness • Health",
  primaryCta: "Agendar Consulta Virtual",
  secondaryCta: "Ver productos",
};

const PRODUCTS = [
  // Productos con precio (USD). Mostrar solo el número.

  {
    id: "semab12-5",
    name: "Sema+B12 - 5/0.5 mg/ml",
    category: "PERDIAD DE PESO - ENERGIA",
    price: 399,
    customOnly: false,
    status: "Disponible",
    bullets:["Vial ya reconstituido de SEMA 5mg con Vitamina B12 0.5 mg / ml", "Vial de 2.5ml",

    ],   
      
  },

  {
    id: "reta-5",
    name: "Reta - GLP1+GIP+GLUCAGON - 5mg",
    category: "CONTROL DE PESO",
    price: 250,
    customOnly: false,
    status: "Disponible",
    bullets: ["Vial liofilizado 5mg", ">99.6% de pureza", "Para reconstituir en 3ml de solución bacteriostática",],
  },

   {
    id: "sema-5",
    name: "Sema-GLP1 - 5mg",
    category: "CONTROL DE PESO",
    price: 150,
    customOnly: false,
    status: "Disponible",
    bullets: ["Vial liofilizado de 5mg", ">99.6% de pureza", "Para reconstituir en 3ml de solución bacteriostática",],
  },
{
    id: "tirz-5",
    name: "Tirze- GLP1+GIP - 10mg",
    category: "CONTROL DE PESO",
    price: 199,
    customOnly: false,
    status: "Disponible",
    bullets: ["Vial liofilizado 10mg", ">99.6% de pureza", "Para reconstituir en 3ml de solución bacteriostática",],
  },

  {
    id: "tirz-vial-17p2mgml-2ml",
    name: "Tirze-GLP1+GIP",
    category: "CONTROL DE PESO ",
    price: 550,
    customOnly: false,
    status: "Disponible",
    bullets: ["Vial ya reconstituido de TIRZE 12mg con Vitamina B3 2mg /ml", "Vial de 2ml",],
  },

  {
    id: "ghkcu-50",
    name: "GHK‑Cu - 50mg",
    category: "BELLEZA, PIEL, PELO, UÑAS",
    price: 49,
    customOnly: false,
    status: "Disponible",
    bullets: ["Vial liofilizado de 50mg", ">99.6% de pureza", "Para reconstituir en 3ml de solución bacteriostática",],
  },

  {
    id: "bpc157-10",
    name: "BPC‑157 - 10 mg",
    category: "RECUPERACION MUSCULOESQUELETICA",
    price: 75,
    customOnly: false,
    status: "Disponible",
    bullets: [
      "Vial liofilizado de 10mg",
      ">99.6% de pureza",
      "Para reconstituir en 3ml de solución bacteriostática",
      
    ],
  },
  {
    id: "tb500-10",
    name: "TB‑500 - 10mg ",
    category: "RECUPERACION MUSCULOESQUELETICA",
    price: 79,
    customOnly: false,
    status: "Disponible",
    bullets: ["Vial liofilizado de 10mg", ">99.6% de pureza", "Para reconstituir en 3ml de solución bacteriostática",],
  },
  
  {
    id: "nad-1000",
    name: "NAD+ - 1,000mg ",
    category: "ENERGIA, ANTI-AGING",
    price: 250,
    customOnly: false,
    status: "Disponible",
    bullets: ["Vial liofilizado de 1,000mg", "Nicotidamide Adenine Dinucleotide", ">99.6% de pureza", "Para reconstituir en 10ml de solución bacteriostática",],
  },
 
  
  

  // Solo por orden personalizada (no se agregan al carrito)
  {
    id: "sema-vial-12p5-5ml",
    name: "Sema-GLP1",
    category: "CONTROL DE PESO ",
    price: 450,
    customOnly: false,
    status: "No Disponible",
    bullets: ["Vial ya reconstituido de 2.5mg/ml", "Vial de 5ml",],
  },
  
  {
    id: "nad-vial-1000mgml-10ml",
    name: "NAD+ ",
    category: "ENERGIA - ANTI-AGING",
    price: 299,
    customOnly: false,
    status: "Disponible",
    bullets: ["Vial ya reconstituido de 100mg/ml", "Nicotidamide Adenine Dinucleotide - Vial de 10ml",],
  },
  {
    id: "lcarn-500mgml-30ml",
    name: "L‑Carnitina",
    category: "QUEMAR GRASA ",
    price: 79,
    customOnly: false,
    status: "Disponible",
    bullets: ["Vial ya reconstituido de 500mg/ml", "Vial de 30ml",],
  },
  {
    id: "gluta-200mgml-30ml",
    name: "Glutatión ",
    category: "BELLEZA - DETOX",
    price: 99,
    customOnly: false,
    status: "Disponible",
    bullets: ["Vial ya reconstituido de 200mg/ml", "Vial de 30ml",],
  },
  {
    id: "arginine200-30ml",
    name: "L-Arginina",
    category: "VASODILATACION - ENERGIA",
    price: 79,
    customOnly: false,
    status: "Disponible",
    bullets: ["Vial ya reconstituido de 200mg/ml", "Vial de 30ml",],
  },
  {
    id: "aminoblend-30ml2",
    name: "Amino Blend ",
    category: "RENDIMIENTO MUSCULAR",
    price: 99,
    customOnly: false,
    status: "Disponible",
    bullets: ["Vial ya reconstituido, Contiene: Arginina, L-Citrulina, L-Lisina, L-Prolina", "Vial de 30ml",],
  },
{
  id: "bpc157-sl",
  name: "BPC-157 Sublingual",
  category: "RECUPERACION MUSCULOESQUELETICA",
  price: 79,
  customOnly: false,
  status: "Disponible",
  bullets: ["Tiras sublinguales", "500 mcg por tira", "20 tiras sublinguales",],
},
{
  id: "ta1-sl",
  name: "Thymosin Alpha-1 Sublingual",
  category: "SISTEMA INMUNOLOGICO",
  price: 79,
  customOnly: false,
  status: "Disponible",
  bullets: ["Tiras sublinguales", "500 mcg por tira", "20 tiras sublinguales",],   
},
{
  id: "pt141-sl",
  name: "PT-141+ Sublingual",
  category: "SALUD SEXUAL Y BIENESTAR",
  price: 79,
  customOnly: false,
  status: "Disponible",
  bullets: ["Tiras sublinguales", "PT141-500 mcg, Oxytocina-25mcg, Aminofelilpyrrol-20mg por tira", "10 tiras sublinguales",],
},
{
  id: "cjc1295-sl",
  name: "CJC-1295 Sublingual",
  category: "AUMENTO DE MASA MUSCULAR",
  price: 79,
  customOnly: false,
  status: "Disponible",
  bullets: ["Tiras sublinguales", "150 mcg por tira", "20 tiras sublinguales",],
},
{
id: "ghkcu-sl",
  name: "GHK-Cu Sublingual",
  category: "BELLEZA, PIEL, PELO, UÑAS",
  price: 79,
  customOnly: false,
  status: "Disponible",
  bullets: ["Tiras sublinguales", "3 mg por tira", "20 tiras sublinguales",],
  },

{
  id: "nr-500",
  name: "NR-500 - 500mg ",
  category: "ENERGIA - ANTI-AGING",
  price: 399,
  customOnly: false,
  status: "Disponible",
  bullets: ["Vial liofilizado 500mg", " Nicotidamide Riboside Chloride >99.6% de pureza", "Para reconstituir en 10ml de solución bacteriostática",],
},

  
  
];

const FAQS = [
  {
    q: "¿Qué son los péptidos?",
    a: "Son pequeñas cadenas de aminoacidos que actúan como mensajeros en el cuerpo. Le indican a nuestras células que realicen funciones específicas, como apoyar la producción de energía de manera natural, inhibir el apetito, fortalecer nuestro sistema inmmune, el aumentar de el líbido en ambos sexos, estimular ciertas hormonas para la eliminación de grasa y recuperación mas rápida en tendones, músculo.",
  },
  {
    q: "¿Los péptidos son inyectados?",
    a: "En AminoPro-MD ofrecemos péptidos tanto en presentaciones inyectables como en ciertas formulaciones sublinguales, dependiendo del compuesto y de la indicación clínica.", 
  },
  {
    q: "¿Qué es mejor, inyectado o sublingual?",
    a: "Ambas pueden ser efectivas, pero funcionan de manera diferente. La vía inyectada suele ofrecer una absorción mas alta y directa. La vía sublingual es más cómoda y menos invasiva, pero su absorción puede ser menor. Actualmente existe una mayor variedad de péptidos inyectados que sublinguales.",
  },
  {
    q: "¿Hacen envíos a todo el país?",
    a: "Sí, enviamos a toda la República de Guatemala.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Paypal / Western Union / Money Gram / Bitcoin.",
  },
  
  
];

// WhatsApp checkout (el cliente confirma y presiona “Enviar”)
// IMPORTANTE: coloca tu número real con código de país (Guatemala +502)
const WHATSAPP_NUMBER = "+19543980930";
const waLink = (message: string): string => {
  const num = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
};


function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="<section className= w-full px-6 md:px-12 py-12">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="mt-2 text-muted-foreground w-full">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Nav() {
  const links = [
    { href: "#productos", label: "Productos" },
    { href: "#consultas", label: "" },
    { href: "#faq", label: "FAQ" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <div className="sticky top-0 z-40 border-b border-green-400 bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
       <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
  <img src="/logo.jpeg" alt="AminoPro-MD" className="h-15 w-auto" />
  <span></span>
</a>

 
        <div className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3">
  <a
    href="https://www.instagram.com/aminopromd"
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 hover:text-foreground"
    aria-label="Instagram AminoPro-MD"
  >
    <img src="/Social/instagram.png" alt="instagram" className="h-10 w-auto" />
    <span></span>
  </a>

  <a
    href="https://www.facebook.com/aminopromd"
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 hover:text-foreground"
    aria-label="Facebook AminoPro-MD"
  >
    <img src="/Social/facebook.png" alt="facebook" className="h-10 w-auto" />
    <span>   </span>
  </a>

  
</div>
        
        </div>
      </div>
    
  );
}

function Hero() {
  return (
    <div
  className="w-full px-6 md: px-12 pt-10 pb-6 bg-cover bg-center"
  style={{ backgroundImage: "url('fondo2.png')" }}
>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-sm text-muted-foreground">{BRAND.tagline}</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
  Péptidos de alta calidad con orientación médica profesional.
</h1>

<p className="mt-4 text-muted-foreground max-w-xl">
  Consulta virtual con el equipo médico de AminoPro-MD para evaluar tu perfil clínico y crear un plan de péptido-terapia
  alineado a tus objetivos de salud, bienestar y rendimiento.
</p>

<div className="mt-4 flex flex-wrap gap-2 text-xs">
  <span className="rounded-full border px-3 py-1">Atención para Guatemala</span>
  
</div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#consultas">{BRAND.primaryCta}</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#productos">{BRAND.secondaryCta}</a>
            </Button>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            
          </p>
        </div>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Acceso rápido</p>
                <h3 className="mt-1 text-lg font-semibold">Enlaces esenciales</h3>
              </div>
              <Badge variant="outline">Links</Badge>
            </div>
            <div className="mt-5 grid gap-3">
              <a className="group flex items-center justify-between rounded-xl border p-4 hover:bg-muted/40 transition" href="#productos">
                <div>
                  <p className="font-medium">Catálogo</p>
                  <p className="text-sm text-muted-foreground">Productos y disponibilidad</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              </a>
              <a className="group flex items-center justify-between rounded-xl border p-4 hover:bg-muted/40 transition" href="#consultas">
                <div>
                  <p className="font-medium">Agendar</p>
                  <p className="text-sm text-muted-foreground">Consulta virtual</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              </a>
              <a className="group flex items-center justify-between rounded-xl border p-4 hover:bg-muted/40 transition" href="#contacto">
                <div>
                  <p className="font-medium">Contacto</p>
                  <p className="text-sm text-muted-foreground">Soporte y preguntas</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Products() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({}); // { [productId]: qty }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) =>
      [p.name, p.category, ...(p.bullets || [])].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const p = PRODUCTS.find((x) => x.id === id);
        return p ? { ...p, qty } : null;
      })
      .filter((x): x is NonNullable<typeof x> => Boolean(x));
  }, [cart]);

  const totalCount = useMemo(
    () => cartItems.reduce((a, c) => a + (c?.qty || 0), 0),
    [cartItems]
  );

  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, i) => {
      const line = typeof i.price === "number" ? i.price * i.qty : 0;
      return sum + line;
    }, 0);
  }, [cartItems]);

  const addToCart = (id: string) =>
  setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

const removeFromCart = (id: string) => {
  setCart((prev) => {
    const next = { ...prev };
    const q = (next[id] || 0) - 1;
    if (q <= 0) delete next[id];
    else next[id] = q;
    return next;
  });
};

  const clearCart = () => setCart({});

  const [customer, setCustomer] = useState({
  name: "",
  city: "",
  country: "",
  email: "",
  phone: "",
});

 const buildCheckoutMessage = () => {
  const lines = [
    "Hola, AminoPro-MD, quiero confirmar esta orden:",
    "",
    ...cartItems.map((i) => {
      const lineTotal = typeof i.price === "number" ? i.price * i.qty : 0;
      return `• ${i.name} x${i.qty} = ${lineTotal}`;
    }),
    "",
    `TOTAL (USD): ${totalAmount}`,
    "",
    "Datos del cliente",
    `Nombre Completo: ${customer.name || ""}`,
    `Dirección completa a enviar la orden: ${customer.city || ""} ${customer.country || ""}`,
    `Correo electrónico: ${customer.email || ""}`,
    `Teléfono: ${customer.phone || ""}`,
       "",
    "Método de pago preferido: Escoga uno",
    "PayPal / Western Union / Money Gram /Bitcoin",
    "",
    "Nota: Escriba cualquier detalle en específico que el equipo de AminoPro-MD deba saber.",
  ];

  return lines.join("\n");
  };

  return (
    <Section
      id="productos"
      title="Productos"
      subtitle="Todos los precios están en USD."
    >
      <div className="mb-5 grid lg:grid-cols-3 gap-4 items-start">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos…"
                className="pl-9"
              />
            </div>
            <Button variant="outline" onClick={() => setQuery("")}>Limpiar</Button>
          </div>
          <div className="mt-3 space-y-2">
            <div className="rounded-xl border p-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Aviso:</span> Checkout y confirmación final se realizan via WhatsApp. Pagos se por medio de  PayPal, Western Union, Money Gram o Bitcoin.
            </div>
            <div id="aviso-legal" className="rounded-xl border p-3 text-xs text-muted-foreground">
    </div>
          </div>
        </div>

        <Card id="carrito" className="rounded-2xl transition">
          <CardContent className="p-5">
            
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Carrito</p>
                <p className="font-medium">{totalCount} item(s)</p>
              </div>
              <Button variant="outline" size="sm" onClick={clearCart} disabled={totalCount === 0}>
                Vaciar
              </Button>
            </div>

            {totalCount === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">Agrega productos para ver el pedido aquí.</p>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="grid gap-2">
                  <Input
                    placeholder="Nombre"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  />
                  <Input
                    placeholder="Ciudad"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  />
                  <Input
                    placeholder="País"
                    value={customer.country}
                    onChange={(e) => setCustomer({ ...customer, country: e.target.value })}
                  />
                  <Input
                    placeholder="Correo electrónico"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
/>

                  <Input
                    placeholder="Teléfono"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
/>
                </div>
                <div className="space-y-2 text-sm">
                  {cartItems.map((i) => (
                    <div key={i.id} className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate">{i.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {typeof i.price === "number" ? `${i.price} × ${i.qty}` : `x${i.qty}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => removeFromCart(i.id)}>
                          −
                        </Button>
                        <span className="w-6 text-center text-sm">{i.qty}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => addToCart(i.id)}>
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm border-t pt-3">
                  <span className="text-muted-foreground">Total (USD)</span>
                  <span className="font-semibold">{totalAmount}</span>
                </div>

                <Button asChild disabled={totalCount === 0}>
                  <a href={waLink(buildCheckoutMessage())} target="_blank" rel="noreferrer">
                    Finalizar por WhatsApp
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
  Si no tienes WhatsApp,{" "}
  <a
    href={`mailto:aminopromd@gmail.com?subject=Orden%20AminoPro-MD&body=${encodeURIComponent(buildCheckoutMessage())}`}
    className="underline text-foreground"
  >
    haz click aquí
  </a>
  {" "}para enviar tu orden por correo electrónico.
</p>


                <p className="text-xs text-muted-foreground">
                  Evita enviar información médica sensible por WhatsApp.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <Card key={p.id} className="rounded-2xl bg-white border-green-600">
            <CardContent className="p-5">
              <img src={`/Products/${p.id}.jpeg`}
  alt={p.name}
  className="w-full h-64 md:h-72 object-contain rounded-lg mb-3"
/>

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{p.category}</p>
                  <h3 className="mt-1 font-semibold truncate">{p.name}</h3>
                </div>
                <Badge variant={p.status === "Disponible" ? "secondary" : "outline"}>{p.status}</Badge>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                {typeof p.price === "number" ? `$${p.price}` : "Más info por WhatsApp"}

              </p>

              <ul className="mt-4 space-y-2 text-sm">
                {(p.bullets || []).map((b, idx) => (
                  <li key={idx} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex gap-2">
                {p.customOnly || typeof p.price !== "number" ? (
                  <Button asChild className="flex-1">
                    <a
                      href={waLink(
                        `Hola, AminoPro-MD, quiero una ORDEN PERSONALIZADA.

Producto: ${p.name}

Mi información
Nombre:
Dirección de envio:
Correo electrónico:
Teléfono: 

Pago preferido: 

Nota: `
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Orden personalizada
                    </a>
                  </Button>
                ) : (
                  <Button
  className="flex-1 cursor-pointer bg-[#A3E635] text-black font-semibold text-base hover:bg-[#84CC16] hover:shadow-lg hover:shadow-[#A3E635]/40 hover:scale-[1.03] transition-all duration-200"
  onClick={() => {
    addToCart(p.id);
    const el = document.getElementById("carrito");
    el?.scrollIntoView({ behavior: "smooth" });
    el?.classList.add("ring-2", "ring-lime-400");
    setTimeout(() => {
      el?.classList.remove("ring-2", "ring-lime-400");
    }, 1000);
  }}
>
  Añadir al carrito
</Button>
                )}

                
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Checkout y confirmación final se realizan via WhatsApp. Pagos por medio de Paypal, Western Union, Money Gram o Bitcoin.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Consults() {
  return (
    <Section
      id="consultas"
      title="Consulta Virtual"
      subtitle="Consulta  virtual personalizada con un médico colegiado del equipo de AminoPro-MD para evaluar tu estado de salud y diseñar un plan de péptido-terapia adaptado a tus objetivos, necesidades y perfil clínico.
Al finalizar la consulta, recibirás tu plan personalizado en formato PDF, firmado y sellado por el médico, directamente en tu correo electrónico."
    >
      <div className="flex justify-center">
        <Button asChild size="lg">
          
          <a
            href={waLink(
              `Hola AminoPro-MD, quiero agendar mi CONSULTA VIRTUAL.

Nombre:
Edad:
Sexo:
País:

Mi objetivo principal es: `
            )}
            target="_blank"
            rel="noreferrer"
          >
            Agendar Consulta Virtual
          </a>
        </Button>
        <p className="text-xs text-muted-foreground mt-3 text-center">
  Si no tienes WhatsApp,{" "}
  <a
    href={`mailto:aminopromd@gmail.com?subject=Consulta%20AminoPro-MD&body=${encodeURIComponent(`Hola AminoPro-MD, quiero agendar mi CONSULTA VIRTUAL.

Nombre:
Edad:
Sexo:
País:

Mi objetivo principal es:`)}`}
    className="underline text-foreground"
  >
    haz click aquí
  </a>{" "}
  para enviarnos un correo.
</p>


      </div>
    </Section>
  );
}


function FAQ() {
  return (
    <Section id="faq" title="Preguntas frecuentes" subtitle="">
      <div className="grid md:grid-cols-2 gap-4">
        {FAQS.map((f, i) => (
          <Card key={i} className="rounded-2xl">
            <CardContent className="p-5">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const buildContactMessage = () => {
    const lines = [
      "Hola, AminoPro-MD, quiero más información:",
      "",
      `Nombre: ${contactForm.name}`,
      `Correo: ${contactForm.email}`,
      "",
      "Mensaje:",
      `${contactForm.message}`,
    ];
    return lines.join("\n");
  };

  const isContactValid =
    contactForm.name.trim() && contactForm.email.trim() && contactForm.message.trim();

  return (
    <Section
      id="contacto"
      title="Contacto"
      subtitle="AminoPro-MD es una marca registrada operada por NeoG Pro, LLC. Con sede en el estado de La Florida, Estados Unidos de  America.

📧 Correo electrónico: aminopromd@gmail.com

🕘 Horario de atención: Lunes a viernes, de 10:00 a.m. a 6:00 p.m. (hora del Este).

Para consultas generales, soporte o información adicional, puedes comunicarte con nosotros a través del correo electrónico indicado, dentro de nuestro horario de atención y nuestro equipo te responderá lo mas pronto posible. "
    >
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="rounded-2xl lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Envíanos un mensaje</h3>

            <div className="mt-4 grid md:grid-cols-2 gap-3">
              <Input
                placeholder="Nombre"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              />

              <Input
                placeholder="Email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              />

              <div className="md:col-span-2">
                <Input
                  placeholder="Mensaje"
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-4">
  <Button asChild disabled={!isContactValid}>
    <a href={waLink(buildContactMessage())} target="_blank" rel="noreferrer">
      Enviar
    </a>
  </Button>
  <p className="text-xs text-muted-foreground mt-3">
  Si no tienes WhatsApp,{" "}
  <a
    href={`mailto:aminopromd@gmail.com?subject=Contacto%20AminoPro-MD&body=${encodeURIComponent(buildContactMessage())}`}
    className="underline text-foreground"
  >
    haz click aquí
  </a>{" "}
  para enviarnos un correo.
</p>

</div>


            <p className="mt-3 text-xs text-muted-foreground">
              Evita enviar información médica sensible por WhatsApp.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Directo</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" /> <span>aminopromd@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" /> <span>+1 954-398-0930</span>
              </div>
              <div className="rounded-xl border p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">Métodos de pago</p>
                <p className="mt-1">PayPal • Western Union • Money Gram • Bitcoin</p>
              </div>
                            
            </div>
          </CardContent>
        </Card>
             </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-muted-foreground">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
  <img src="/logo.jpeg" alt="AminoPro-MD" className="h-8 w-auto" />
  <p>© {new Date().getFullYear()} {BRAND.name}. Propiedad de NeoG Pro, LLC. Todos los derechos reservados.</p>
</div>
          <div className="flex flex-wrap gap-3">
          
          </div>
          <div className="mt-3 flex items-center gap-3">
  <a
    href="https://www.instagram.com/aminopromd"
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 hover:text-foreground"
    aria-label="Instagram AminoPro-MD"
  >
    <img src="/Social/instagram.png" alt="instagram" className="h-8 w-auto" />
    <span></span>
  </a>

  <a
    href="https://www.facebook.com/aminopromd"
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 hover:text-foreground"
    aria-label="Facebook AminoPro-MD"
  >
    <img src="/Social/facebook.png" alt="facebook" className="h-8 w-auto" />
    <span></span>
  </a>

 
</div>
        </div>
        <p className="mt-4">
          Aviso: Este sitio no ofrece atención médica de emergencia. Si tienes una emergencia, llama al 122/123 (Guatemala) o tu
          número local de emergencias.
        </p>
      </div>
    </footer>
  );
}
function AgeGate({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/intro-logo.jpg')" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="flex flex-col items-center justify-end min-h-screen pb-20 text-center">
          <p className="mb-4 text-sm text-slate-200">
            Al continuar confirmas que tienes <strong>21 años o más</strong>
          </p>

          <Button
            size="lg"
            className="px-10 py-6 text-base"
            onClick={onAccept}
          >
            Entrar · Tengo 21+
          </Button>

          <a
            href="https://google.com"
            className="mt-4 text-xs text-slate-300 hover:text-white"
            rel="noreferrer"
          >
            Salir
          </a>
        </div>
      </div>
    </div>
  );
}
export default function SitePeptidosTelemed() {
  const [ageAccepted, setAgeAccepted] = useState(false);

const acceptAge = () => {
  setAgeAccepted(true);
};

  return (
    <div className="min-h-screen bg-[#FFFFFF] scroll-smooth">
      {!ageAccepted && <AgeGate onAccept={acceptAge} />}

      {/* Your real site */}
      <Nav />
      <Hero />
      <Products />
      <Consults />
      <FAQ />
      <Contact />
      <Footer />
       <div id="aviso-legal" className="rounded-xl border p-3 text-xs text-muted-foreground">
  <span className="font-medium text-foreground">Aviso legal / términos y condiciones:</span> Este sitio web no ofrece atención médica de emergencia. La información contenida en este sitio se proporciona únicamente con fines educativos e informativos y no sustituye una evaluación médica presencial, diagnóstico clínico ni tratamiento médico. Los resultados pueden variar según cada persona. Al acceder a este sitio web, realizar una orden o utilizar los servicios de AminoPro-MD, el usuario declara y garantiza que tiene al menos veintiuno (21) años de edad y que actúa de manera voluntaria y bajo su propia responsabilidad. Los productos ofrecidos en este sitio están clasificados como suplementos dietéticos (“dietary supplements”) conforme a la normativa vigente y, como tales, no requieren aprobación previa por parte de la Administración de Alimentos y Medicamentos de los Estados Unidos (FDA). Asimismo, algunos productos pueden estar destinados exclusivamente para fines de investigación (“research use only”) y no están destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad. El acceso o uso de este sitio web no establece una relación médico-paciente entre el usuario y AminoPro-MD o cualquiera de sus profesionales afiliados. Dicha relación solo se establece tras la realización de una consulta médica virtual. El usuario reconoce y acepta que el uso, manejo, almacenamiento, dosificación y administración de cualquier producto adquirido a través de AminoPro-MD se realiza bajo su exclusiva responsabilidad. AminoPro-MD no garantiza resultados específicos o resultados terapéuticos derivados del uso de cualquier producto o protocolo. AminoPro-MD, así como sus propietarios, directivos, empleados, contratistas, afiliados y proveedores médicos, no asumen responsabilidad alguna por daños, pérdidas, efectos adversos o reclamaciones derivadas del uso indebido, incorrecto o no conforme a las indicaciones proporcionadas. En ningún caso AminoPro-MD será responsable por daños directos, indirectos, incidentales, especiales o consecuenciales derivados del uso o imposibilidad de uso de los productos o servicios ofrecidos. Las consultas médicas virtuales, cuando aplican, se realizan bajo consentimiento informado y no sustituyen la atención médica primaria o de emergencia. Se recomienda que el usuario consulte con su proveedor de atención médica autorizado antes de iniciar el uso de cualquier producto o protocolo adquirido a través de este sitio. La información personal proporcionada por el usuario será tratada de manera confidencial y utilizada únicamente con fines administrativos, clínicos y de seguimiento, basandose a lo establecido por la Ley HIPPA de los Estados Unidos y demás normativa aplicable. Todas las ventas son finales. Todos los pagos son definitivos, no reembolsables, no transferibles y no cancelables, independientemente del uso del producto o de los resultados obtenidos. Al utilizar este sitio web, el usuario confirma que ha leído, comprendido y aceptado estos términos y condiciones. 
  </div>
    </div>
  );
}

