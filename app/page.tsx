"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "./data/products";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Phone,
  Mail,
  ExternalLink,
  Search,
  ShoppingCart,
  MessageCircle,
  Instagram,
  Facebook,
} from "lucide-react";


type Product = {
  id: string;
  name: string;
  category: string;
  price?: number;
  customOnly?: boolean;
  status?: string;
  bullets?: string[];
  coas?: {
    label: string;
    href: string;
  }[];
};

const ALL_PRODUCTS = PRODUCTS as Product[];

const BRAND = {
  name: "AminoPro-MD",
  tagline: "Peptides • Fitness • Health",
  primaryCta: "Agendar Consulta Virtual",
  secondaryCta: "Ver productos",
};

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
    a: "Paypal.",
  },
];

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
    <section
  id={id}
  className="
    w-full px-6 md:px-12 py-16
    bg-gradient-to-b
    from-[#FCFDFB]
    to-[#F7FAF4]
  "
>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h2>
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
    { href: "#faq", label: "FAQ" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <div className="sticky top-0 z-40 border-b border-green-400 bg-background/80 backdrop-blur">
      <div className="w-full px-6 md:px-12 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
  <a href="#" className="flex items-center">
    <img
      src="/logo.jpeg"
      alt="AminoPro-MD"
      className="h-20 w-auto"
    />
  </a>

  <img
    src="/1year.jpg"
    alt="1 Año Aniversario"
    className="h-18 w-auto"
  />
</div>

        <div className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/aminopromdplus"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram AminoPro-MD"
          >
            <img src="/Social/instagram.png" alt="instagram" className="h-10 w-auto" />
          </a>

          <a
            href="https://www.facebook.com/aminopromd"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook AminoPro-MD"
          >
            <img src="/Social/facebook.png" alt="facebook" className="h-10 w-auto" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const quickLinks = [
    {
      title: "Catálogo",
      subtitle: "Explora nuestros productos",
      href: "#productos",
      image: "/catalogo.jpg",
    },
    {
      title: "Agendar Consulta",
      subtitle: "Consulta virtual personalizada",
      href: "#consultas",
      image: "/consulta.jpg",
    },
    {
      title: "Contacto",
      subtitle: "Estamos para ayudarte",
      href: "#contacto",
      image: "/contacto.jpg",
    },
  ];

  return (
    <div
      className="
  w-full px-6 md:px-12 pt-10 pb-12
  bg-gradient-to-br
  from-[#f7faf4]
  via-[#fbfdf9]
  to-[#eef7e7]
  bg-cover bg-center"

      style={{ backgroundImage: "url('/fondo2.png')" }}
    >
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">

        {/* IZQUIERDA */}
        <div>
          <p className="text-sm text-muted-foreground">{BRAND.tagline}</p>

          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-[#10150d]">
  Péptidos de alta calidad, con más de 1 año de experiencia!</h1>

          <p className="mt-4 text-muted-foreground max-w-xl">
            La información presentada en este sitio web es exclusivamente para
            fines educativos. Los productos listados son únicamente para fines
            de investigación y no se recomienda su uso en humanos.
            <br />
            <br />
            Consulta a tu médico.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#consultas">{BRAND.primaryCta}</a>
            </Button>

            <Button asChild variant="outline">
              <a href="#productos">{BRAND.secondaryCta}</a>
            </Button>
          </div>
        </div>

        {/* ENLACES ESENCIALES */}
        <div>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Acceso rápido</p>

            <h3 className="text-2xl font-semibold">
              Enlaces esenciales
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {quickLinks.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="
                  group relative overflow-hidden rounded-2xl
                  h-[280px] border border-green-500/30
                  shadow-md hover:shadow-2xl
                  transition-all duration-500
                  hover:-translate-y-2
                "
              >
                {/* IMAGEN */}
                <img
  src={item.image}
  alt={item.title}
  className="
    absolute inset-0 w-full h-full object-cover
    opacity-90
    transition-all duration-700
    group-hover:scale-105
    group-hover:opacity-100
  "
/>

<div
  className="
    absolute inset-0
    bg-gradient-to-t
    from-black/75
    via-black/10
    to-white/5
    transition-all duration-500
  "
/>

                {/* OVERLAY */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/90 via-black/30 to-transparent
                    transition-all duration-500
                    group-hover:from-black/95
                  "
                />

                {/* CONTENIDO */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h4 className="text-xl font-semibold">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-sm text-white/80">
                        {item.subtitle}
                      </p>
                    </div>

                    <div
                      className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-full
bg-[#8fcf32]/90
text-[#10150d]
shadow-[0_0_18px_rgba(143,207,50,0.20)]
                        transition-all duration-300
                        group-hover:translate-x-1
                        group-hover:scale-110
                      "
                    >
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* BRILLO AL PASAR EL MOUSE */}
                <div
                  className="
                    absolute inset-0 opacity-0
                    group-hover:opacity-100
                    bg-gradient-to-tr
                    from-lime-400/10 via-transparent to-white/10
                    transition-opacity duration-500
                    pointer-events-none
                  "
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Products() {
  const [query, setQuery] = useState("");

  const [cart, setCart] = useState<Record<string, number>>({});
const [cartLoaded, setCartLoaded] = useState(false);

useEffect(() => {
  const saved = localStorage.getItem("aminopromd-cart");

  if (saved) {
    try {
      setCart(JSON.parse(saved));
    } catch {
      localStorage.removeItem("aminopromd-cart");
    }
  }

  setCartLoaded(true);
}, []);

useEffect(() => {
  if (!cartLoaded) return;

  localStorage.setItem(
    "aminopromd-cart",
    JSON.stringify(cart)
  );
}, [cart, cartLoaded]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_PRODUCTS;

    return ALL_PRODUCTS.filter((p) =>
      [p.name, p.category, ...(p.bullets || [])]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const p = ALL_PRODUCTS.find((x) => x.id === id);
        return p ? { ...p, qty } : null;
      })
      .filter((x): x is Product & { qty: number } => Boolean(x));
  }, [cart]);

  const totalCount = useMemo(
    () => cartItems.reduce((a, c) => a + c.qty, 0),
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
      "Método de pago:",
      "PayPal",
      "",
      "Nota:",
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

            <Button variant="outline" onClick={() => setQuery("")}>
              Limpiar
            </Button>
          </div>

          <div className="mt-3 space-y-2">
  <div
    className="
      rounded-xl
      border border-[#8fcf32]/20
      bg-[#f4f9ef]
      p-3
      text-xs
      text-muted-foreground
    "
  >
    <span className="font-medium text-foreground">Aviso:</span>{" "}
    Checkout y confirmación final se realizan via WhatsApp. Pagos por
    medio de PayPal.
  </div>
</div>
        </div>

        <Card
  id="carrito"
  className="
  rounded-[28px]
  border border-[#8FDB38]
  bg-white
  shadow-[0_10px_35px_rgba(80,120,30,0.07)]
  transition-all duration-300
"
>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-lime-500" />
                  <p className="text-xs text-muted-foreground">Carrito</p>
                </div>
                <p className="font-medium">{totalCount} item(s)</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                disabled={totalCount === 0}
              >
                Vaciar
              </Button>
            </div>

            {totalCount === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Agrega productos para ver el pedido aquí.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="grid gap-2">
                  <Input
                    placeholder="Nombre de quien recibe"
                    value={customer.name}
                    onChange={(e) =>
                      setCustomer({ ...customer, name: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Dirección a enviar"
                    value={customer.city}
                    onChange={(e) =>
                      setCustomer({ ...customer, city: e.target.value })
                    }
                  />

                  <Input
                    placeholder="País"
                    value={customer.country}
                    onChange={(e) =>
                      setCustomer({ ...customer, country: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Correo electrónico"
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer({ ...customer, email: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Teléfono"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2 text-sm">
                  {cartItems.map((i) => (
                    <div
                      key={i.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate">{i.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {typeof i.price === "number"
                            ? `${i.price} × ${i.qty}`
                            : `x${i.qty}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => removeFromCart(i.id)}
                        >
                          −
                        </Button>

                        <span className="w-6 text-center text-sm">{i.qty}</span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => addToCart(i.id)}
                        >
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

               <Button
  asChild
  disabled={totalCount === 0}
  className="
    w-full
    h-12
    rounded-full
    bg-gradient-to-r
    from-[#75C900]
    via-[#A6F32B]
    to-[#B8FF43]
    text-black
    font-bold
    border border-[#7CCB22]
    shadow-[0_5px_18px_rgba(120,210,20,0.22)]
    transition-all duration-300
    hover:scale-[1.01]
    hover:shadow-[0_7px_24px_rgba(120,210,20,0.35)]
    hover:from-[#82D80A]
    hover:via-[#AEF638]
    hover:to-[#C1FF55]
  "
>
  <a
    href={waLink(buildCheckoutMessage())}
    target="_blank"
    rel="noreferrer"
  >
    Finalizar por WhatsApp
  </a>
</Button>

                <p className="text-xs text-muted-foreground mt-2">
                  Si no tienes WhatsApp,{" "}
                  <a
                    href={`mailto:aminopromd@gmail.com?subject=Orden%20AminoPro-MD&body=${encodeURIComponent(
                      buildCheckoutMessage()
                    )}`}
                    className="underline text-foreground"
                  >
                    haz click aquí
                  </a>{" "}
                  para enviar tu orden por correo electrónico.
                </p>

                <p className="text-xs text-muted-foreground">
                  Evita enviar información médica sensible por WhatsApp.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <Card
  key={p.id}
  className="
    group overflow-hidden
    rounded-[28px]
    border border-[#8FDB38]
    bg-white
    shadow-[0_10px_35px_rgba(80,120,30,0.06)]
    transition-all duration-300
    hover:-translate-y-1
    hover:shadow-[0_16px_45px_rgba(100,180,30,0.12)]
  "
>
  <CardContent className="p-4 md:p-5">

    {/* IMAGEN */}
    <Link href={`/producto/${p.id}`}>
      <div
        className="
          relative overflow-hidden
          rounded-[22px]
          bg-gradient-to-br
          from-[#F3F5F2]
          via-white
          to-[#F0F8E8]
          h-[290px]
        "
      >
        <img
          src={`/Products/${p.id}.jpeg`}
          alt={p.name}
          className="
            h-full w-full object-contain
            p-3
            transition-transform duration-500
            group-hover:scale-[1.03]
          "
        />

            </div>
    </Link>

    {/* CATEGORÍA + DISPONIBILIDAD */}
    <div className="mt-5 flex items-center justify-between gap-3">
      <div>
        <p className="
          text-[11px]
          uppercase
          tracking-[0.20em]
          text-[#363B34]
        ">
          {p.category}
        </p>

        <div className="mt-2 h-[2px] w-9 bg-[#65B92E]" />
      </div>

      <div
        className="
          flex items-center gap-2
          rounded-full
          border border-[#BCEB91]
          bg-[#F1FFE4]
          px-3 py-1.5
          text-xs text-[#315C15]
        "
      >
        <span className="h-2 w-2 rounded-full bg-[#65BE1B]" />

        {p.status || "Disponible"}
      </div>
    </div>

    {/* NOMBRE */}
    <Link href={`/producto/${p.id}`}>
      <h3
        className="
          mt-5
          text-3xl
          font-semibold
          tracking-tight
          text-[#151815]
          transition-colors
          hover:text-[#579D20]
        "
      >
        {p.name}
      </h3>
    </Link>

    {/* PRECIO */}
    <p className="
      mt-1
      text-3xl
      font-bold
      tracking-tight
      text-[#3D7C18]
    ">
      {typeof p.price === "number"
        ? `$${p.price}`
        : "Consultar"}
    </p>

    {/* INFORMACIÓN */}
    <div className="mt-6 space-y-3">
      {(p.bullets || []).map((b, idx) => (
        <div key={idx} className="flex items-start gap-3">

          <div
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              border border-[#CBEBAA]
              bg-[#F3FFE8]
            "
          >
            <Check className="h-4 w-4 text-[#315C15]" />
          </div>

          <span className="pt-2 text-sm leading-5 text-[#252A23]">
            {b}
          </span>
        </div>
      ))}
    </div>

    <div className="my-6 h-px bg-[#DDE4D8]" />

    {/* BOTÓN */}
    {p.customOnly || typeof p.price !== "number" ? (

      <Button asChild className="w-full rounded-full">
        <a
          href={waLink(
            `Hola, AminoPro-MD, quiero una ORDEN PERSONALIZADA.

Producto: ${p.name}`
          )}
          target="_blank"
          rel="noreferrer"
        >
          Orden personalizada
        </a>
      </Button>

    ) : (

      <button
        onClick={() => {
          addToCart(p.id);

          const el = document.getElementById("carrito");

          el?.scrollIntoView({
            behavior: "smooth",
          });

          el?.classList.add(
            "ring-2",
            "ring-lime-400"
          );

          setTimeout(() => {
            el?.classList.remove(
              "ring-2",
              "ring-lime-400"
            );
          }, 1000);
        }}
        className="
          group/button
          relative
          flex h-16 w-full
          items-center
          overflow-hidden
          rounded-full

          border border-[#7CCB22]

          bg-gradient-to-r
          from-[#75C900]
          via-[#A6F32B]
          to-[#B8FF43]

          shadow-[0_6px_20px_rgba(120,210,20,.22)]

          transition-all duration-300

          hover:scale-[1.01]
          hover:shadow-[0_8px_28px_rgba(120,210,20,.35)]

          active:scale-[.98]
        "
      >

        {/* CARRITO */}
        <div
          className="
            flex h-10 w-16
            items-center justify-center
            border-r border-black/20
          "
        >
          <ShoppingCart className="h-6 w-6 text-black" />
        </div>

        {/* TEXTO */}
        <span
          className="
            flex-1
            text-center
            text-base
            font-bold
            text-black
          "
        >
          Añadir al carrito
        </span>

        {/* FLECHA */}
        <div
          className="
            mr-2
            flex h-12 w-12
            shrink-0
            items-center justify-center
            rounded-full
            bg-[#10140E]
            text-[#A7FF28]

            transition-transform duration-300
            group-hover/button:translate-x-1
          "
        >
          <span className="text-3xl leading-none">
            ›
          </span>
        </div>

      </button>

    )}

    {/* CHECKOUT */}
    <div
      className="
        mt-5
        border-t border-[#E0E6DC]
        pt-4
      "
    >
      <p className="text-xs leading-5 text-[#656B62]">
        Checkout y confirmación final se realizan vía WhatsApp.
        Pagos por medio de PayPal.
      </p>
    </div>

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
      subtitle="Consulta virtual personalizada con un médico colegiado del equipo de AminoPro-MD para evaluar tu estado de salud y diseñar un plan de péptido-terapia adaptado a tus objetivos, necesidades y perfil clínico. Al finalizar la consulta, recibirás tu plan personalizado en formato PDF, firmado y sellado por el médico, directamente en tu correo electrónico."
    >
      <div
        className="
          overflow-hidden
          rounded-3xl
          border border-[#8fcf32]/25
          bg-white/70
          shadow-[0_12px_40px_rgba(0,0,0,0.07)]
        "
      >
        <div className="grid md:grid-cols-2 items-stretch">

          {/* IMAGEN */}
          <div className="relative min-h-[300px] md:min-h-[420px] overflow-hidden group">
            <img
              src="/consulta-virtual.jpg"
              alt="Consulta Virtual AminoPro-MD"
              className="
                absolute inset-0
                h-full w-full
                object-cover
                transition-transform duration-700
                group-hover:scale-105
              "
            />

            <div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-black/10
                via-transparent
                to-transparent
              "
            />

            <div className="absolute left-6 bottom-6">
              <div
                className="
                  rounded-full
                  border border-white/20
                  bg-black/60
                  px-4 py-2
                  text-sm font-medium text-white
                  backdrop-blur-md
                "
              >
                AminoPro-MD • Consulta Virtual
              </div>
            </div>
          </div>

          {/* CONTENIDO */}
          <div
            className="
              flex flex-col
              justify-center
              p-8 md:p-12
              bg-gradient-to-br
              from-white
              to-[#f3f8ee]
            "
          >
            <p className="text-sm font-medium text-[#78ad2c]">
              ATENCIÓN PERSONALIZADA
            </p>

            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-[#10150d]">
              Tu plan comienza con una evaluación profesional.
            </h3>

            <p className="mt-4 text-sm md:text-base leading-7 text-muted-foreground">
              Agenda tu consulta virtual con nuestro equipo y recibe orientación
              personalizada de acuerdo con tus objetivos y perfil.
            </p>

            <div className="mt-7">
              <Button asChild size="lg">
                <a
                  href={waLink(
                    `Hola AminoPro-MD, quiero agendar mi CONSULTA VIRTUAL.

Nombre:
Edad:
Sexo:
País:

Mi objetivo principal es:`
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Agendar Consulta Virtual
                </a>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Si no tienes WhatsApp,{" "}
              <a
                href={`mailto:aminopromd@gmail.com?subject=Consulta%20AminoPro-MD&body=${encodeURIComponent(
                  `Hola AminoPro-MD, quiero agendar mi CONSULTA VIRTUAL.

Nombre:
Edad:
Sexo:
País:

Mi objetivo principal es:`
                )}`}
                className="underline text-foreground hover:text-[#78ad2c] transition-colors"
              >
                haz click aquí
              </a>{" "}
              para enviarnos un correo.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}



function FAQ() {
  return (
    <Section id="faq" title="Preguntas frecuentes">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 items-start">
        <div className="group relative overflow-hidden rounded-[28px] border border-[#8FDB38] bg-black shadow-[0_10px_35px_rgba(80,120,30,0.06)]">
          <img
            src="/faq.jpg"
            alt="Preguntas frecuentes AminoPro-MD"
            className="block w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>

        <div className="grid gap-3">
          {FAQS.map((f, i) => (
            <Card
              key={i}
              className="rounded-[22px] border border-[#8FDB38]/60 bg-white shadow-[0_6px_20px_rgba(80,120,30,0.04)] transition-all duration-300 hover:border-[#78C92C] hover:shadow-[0_8px_25px_rgba(100,180,30,0.10)]"
            >
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#BCEB91] bg-[#F0FFE3] font-bold text-[#4F8E20]">
                    ?
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#151815]">{f.q}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section
      id="contacto"
      title="Contacto"
      subtitle="Estamos para ayudarte. Comunícate con AminoPro-MD por cualquiera de nuestros canales."
    >
      <div
        className="
          overflow-hidden
          rounded-[28px]
          border border-[#8FDB38]
          bg-white
          shadow-[0_10px_35px_rgba(80,120,30,0.06)]
        "
      >
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] items-stretch">

          {/* IMAGEN */}
          <div
            className="
              group relative
              min-h-[350px]
              lg:min-h-[480px]
              overflow-hidden
              bg-black
            "
          >
            <img
              src="/contacto1.jpg"
              alt="Contacto AminoPro-MD"
              className="
                absolute inset-0
                h-full w-full
                object-cover
                transition-transform duration-700
                group-hover:scale-[1.03]
              "
            />

            {/* DEGRADADO */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/50
                via-transparent
                to-transparent
              "
            />

            {/* TEXTO SOBRE IMAGEN */}
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p
                className="
                  text-xs font-semibold
                  uppercase tracking-[0.22em]
                  text-[#B8FF43]
                "
              >
                AMINOPRO-MD
              </p>

              <h3 className="mt-2 text-2xl font-semibold">
                Estamos para ayudarte.
              </h3>

              <p className="mt-2 max-w-sm text-sm text-white/80">
                Escríbenos y nuestro equipo estará disponible para orientarte.
              </p>
            </div>
          </div>

          {/* INFORMACIÓN */}
          <div
            className="
              flex flex-col
              justify-center
              bg-gradient-to-br
              from-white
              to-[#F3F8EE]
              p-7
              md:p-10
              lg:p-12
            "
          >
            <p
              className="
                text-xs font-semibold
                uppercase tracking-[0.20em]
                text-[#579D20]
              "
            >
              CONTÁCTANOS
            </p>

            <h3
              className="
                mt-3
                text-3xl md:text-4xl
                font-semibold
                tracking-tight
                text-[#151815]
              "
            >
              Hablemos.
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Selecciona el medio que prefieras para comunicarte con
              AminoPro-MD.
            </p>

            {/* WHATSAPP */}
            <a
              href={waLink(
                "Hola AminoPro-MD, me gustaría recibir más información."
              )}
              target="_blank"
              rel="noreferrer"
              className="
                group mt-8
                flex items-center
                justify-between
                rounded-[20px]
                border border-[#BCEB91]
                bg-white
                p-4
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-[#8FDB38]
                hover:shadow-[0_8px_25px_rgba(100,180,30,0.10)]
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-full
                    bg-[#F0FFE3]
                    text-[#579D20]
                  "
                >
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold text-[#151815]">
                    WhatsApp
                  </p>

                  <p className="text-sm text-muted-foreground">
                    +1 (954) 398-0930
                  </p>
                </div>
              </div>

              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-[#10140E]
                  text-[#A7FF28]
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              >
                <span className="text-2xl">›</span>
              </div>
            </a>

            {/* EMAIL */}
            <a
              href="mailto:aminopromd@gmail.com"
              className="
                group mt-3
                flex items-center
                justify-between
                rounded-[20px]
                border border-[#BCEB91]
                bg-white
                p-4
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-[#8FDB38]
                hover:shadow-[0_8px_25px_rgba(100,180,30,0.10)]
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-full
                    bg-[#F0FFE3]
                    text-[#579D20]
                  "
                >
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold text-[#151815]">
                    Correo electrónico
                  </p>

                  <p className="text-sm text-muted-foreground">
                    aminopromd@gmail.com
                  </p>
                </div>
              </div>

              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-[#10140E]
                  text-[#A7FF28]
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              >
                <span className="text-2xl">›</span>
              </div>
            </a>

{/* INSTAGRAM */}
<a
  href="https://www.instagram.com/aminopromdplus"
  target="_blank"
  rel="noreferrer"
  className="
    group mt-3
    flex items-center
    justify-between
    rounded-[20px]
    border border-[#BCEB91]
    bg-white
    p-4
    transition-all duration-300
    hover:-translate-y-0.5
    hover:border-[#8FDB38]
    hover:shadow-[0_8px_25px_rgba(100,180,30,0.10)]
  "
>
  <div className="flex items-center gap-4">
    <div
      className="
        flex h-12 w-12
        items-center justify-center
        rounded-full
        bg-[#F0FFE3]
        text-[#579D20]
      "
    >
      <Instagram className="h-5 w-5" />
    </div>

    <div>
      <p className="font-semibold text-[#151815]">
        Instagram
      </p>

      <p className="text-sm text-muted-foreground">
        @aminopromdplus
      </p>
    </div>
  </div>

  <div
    className="
      flex h-10 w-10
      items-center justify-center
      rounded-full
      bg-[#10140E]
      text-[#A7FF28]
      transition-transform duration-300
      group-hover:translate-x-1
    "
  >
    <span className="text-2xl">›</span>
  </div>
</a>


{/* FACEBOOK */}
<a
  href="https://www.facebook.com/aminopromd"
  target="_blank"
  rel="noreferrer"
  className="
    group mt-3
    flex items-center
    justify-between
    rounded-[20px]
    border border-[#BCEB91]
    bg-white
    p-4
    transition-all duration-300
    hover:-translate-y-0.5
    hover:border-[#8FDB38]
    hover:shadow-[0_8px_25px_rgba(100,180,30,0.10)]
  "
>
  <div className="flex items-center gap-4">
    <div
      className="
        flex h-12 w-12
        items-center justify-center
        rounded-full
        bg-[#F0FFE3]
        text-[#579D20]
      "
    >
      <Facebook className="h-5 w-5" />
    </div>

    <div>
      <p className="font-semibold text-[#151815]">
        Facebook
      </p>

      <p className="text-sm text-muted-foreground">
        AminoPro-MD
      </p>
    </div>
  </div>

  <div
    className="
      flex h-10 w-10
      items-center justify-center
      rounded-full
      bg-[#10140E]
      text-[#A7FF28]
      transition-transform duration-300
      group-hover:translate-x-1
    "
  >
    <span className="text-2xl">›</span>
  </div>
</a>


            {/* WEB */}
            <a
              href="https://www.aminopromd.com"
              target="_blank"
              rel="noreferrer"
              className="
                group mt-3
                flex items-center
                justify-between
                rounded-[20px]
                border border-[#BCEB91]
                bg-white
                p-4
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-[#8FDB38]
                hover:shadow-[0_8px_25px_rgba(100,180,30,0.10)]
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-full
                    bg-[#F0FFE3]
                    text-[#579D20]
                  "
                >
                  <ExternalLink className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold text-[#151815]">
                    Sitio web
                  </p>

                  <p className="text-sm text-muted-foreground">
                    www.aminopromd.com
                  </p>
                </div>
              </div>

              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-[#10140E]
                  text-[#A7FF28]
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              >
                <span className="text-2xl">›</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}



function Footer() {
  return (
    <footer className="border-t">
      <div className="w-full px-6 md:px-12 py-8 text-xs text-muted-foreground">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="AminoPro-MD" className="h-15 w-auto" />
            <p>
              © {new Date().getFullYear()} {BRAND.name}. Propiedad de NeoG Pro,
              LLC. Todos los derechos reservados.
            </p>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <a
              href="https://www.instagram.com/aminopromdplus"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram AminoPro-MD"
            >
              <img src="/Social/instagram.png" alt="instagram" className="h-8 w-auto" />
            </a>

            <a
              href="https://www.facebook.com/aminopromd"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook AminoPro-MD"
            >
              <img src="/Social/facebook.png" alt="facebook" className="h-8 w-auto" />
            </a>
          </div>
        </div>

        <p className="mt-4">
          Aviso: Este sitio no ofrece atención médica de emergencia. Si tienes
          una emergencia, llama al 122/123 Guatemala o tu número local de
          emergencias.
        </p>
      </div>
    </footer>
  );
}

function AgeGate({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/intro-logo2.jpg')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="flex flex-col items-center justify-end min-h-screen pb-20 text-center">
          <p className="mb-4 text-sm text-slate-200">
            Al continuar confirmas que tienes <strong>21 años de edad o más. Asimismo, reconoces y entiendes que este sitio web tiene propósitos exclusivamente educativos e informativos, y que algunos de los productos aquí presentados se ofrecen únicamente para fines de investigación y no están destinados para uso humano.

Consulta con tu médico.</strong>
          </p>

          <Button
  size="lg"
  className="px-10 py-6 text-base"
  onClick={() => {
    localStorage.setItem(
      "adultVerified",
      JSON.stringify({
        verified: true,
        timestamp: Date.now(),
      })
    );

    onAccept();
  }}
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

  useEffect(() => {
    const stored = localStorage.getItem("adultVerified");

    if (stored) {
      const data = JSON.parse(stored);

      const fourHours = 4 * 60 * 60 * 1000;

      if (Date.now() - data.timestamp < fourHours) {
        setAgeAccepted(true);
      }
    }
  }, []);  

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#11150F] scroll-smooth"> 
      {!ageAccepted && <AgeGate onAccept={() => setAgeAccepted(true)} />}

      <Nav />
      <Hero />
      <Products />
      <Consults />
      <FAQ />
      <Contact />
      <Footer />

      <div
        id="aviso-legal"
        className="rounded-xl border p-3 text-xs text-muted-foreground mx-6 md:mx-12 mb-8"
      >
        <span className="font-medium text-foreground">
          Aviso legal / términos y condiciones:
        </span>{" "}
        Este sitio web no ofrece atención médica de emergencia. La información
        contenida en este sitio se proporciona únicamente con fines educativos e
        informativos y no sustituye una evaluación médica presencial, diagnóstico
        clínico ni tratamiento médico. Los resultados pueden variar según cada
        persona. Al acceder a este sitio web, realizar una orden o utilizar los
        servicios de AminoPro-MD, el usuario declara y garantiza que tiene al
        menos veintiuno (21) años de edad y que actúa de manera voluntaria y
        bajo su propia responsabilidad. Los productos ofrecidos en este sitio
        están clasificados como suplementos dietéticos (“dietary supplements”)
        conforme a la normativa vigente y, como tales, no requieren aprobación
        previa por parte de la Administración de Alimentos y Medicamentos de los
        Estados Unidos (FDA). Asimismo, algunos productos pueden estar destinados
        exclusivamente para fines de investigación (“research use only”) y no
        están destinados a diagnosticar, tratar, curar o prevenir ninguna
        enfermedad. El acceso o uso de este sitio web no establece una relación
        médico-paciente entre el usuario y AminoPro-MD o cualquiera de sus
        profesionales afiliados. Dicha relación solo se establece tras la
        realización de una consulta médica virtual. El usuario reconoce y acepta
        que el uso, manejo, almacenamiento, dosificación y administración de
        cualquier producto adquirido a través de AminoPro-MD se realiza bajo su
        exclusiva responsabilidad. AminoPro-MD no garantiza resultados
        específicos o resultados terapéuticos derivados del uso de cualquier
        producto o protocolo. AminoPro-MD, así como sus propietarios,
        directivos, empleados, contratistas, afiliados y proveedores médicos, no
        asumen responsabilidad alguna por daños, pérdidas, efectos adversos o
        reclamaciones derivadas del uso indebido, incorrecto o no conforme a las
        indicaciones proporcionadas. En ningún caso AminoPro-MD será responsable
        por daños directos, indirectos, incidentales, especiales o
        consecuenciales derivados del uso o imposibilidad de uso de los productos
        o servicios ofrecidos. Las consultas médicas virtuales, cuando aplican,
        se realizan bajo consentimiento informado y no sustituyen la atención
        médica primaria o de emergencia. Se recomienda que el usuario consulte
        con su proveedor de atención médica autorizado antes de iniciar el uso de
        cualquier producto o protocolo adquirido a través de este sitio. La
        información personal proporcionada por el usuario será tratada de manera
        confidencial y utilizada únicamente con fines administrativos, clínicos y
        de seguimiento, basandose a lo establecido por la Ley HIPPA de los
        Estados Unidos y demás normativa aplicable. Todas las ventas son finales.
        Todos los pagos son definitivos, no reembolsables, no transferibles y no
        cancelables, independientemente del uso del producto o de los resultados
        obtenidos. Al utilizar este sitio web, el usuario confirma que ha leído,
        comprendido y aceptado estos términos y condiciones.
      </div>
    </div>
  );
}