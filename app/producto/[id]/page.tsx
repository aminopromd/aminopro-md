"use client";

import React, { useEffect, useState } from "react"; // 👈 aquí
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PRODUCTS } from "@/app/data/products";

const WHATSAPP_NUMBER = "+19543980930";

const waLink = (message: string): string => {
  const num = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
};

const PRODUCT_INFO: Record<
  string,
  {
    title?: string;
    what: string;
    use: string;
    benefits: React.ReactNode;
    moleculeImage?: string;
  }
> = {

  "tesa-5": {
    title: "TESA - 5mg",
    moleculeImage: "/estrucmoletesa.jpg",
    what: "La Tesamorelina es un análogo sintético de la hormona liberadora de la hormona del crecimiento (GHRH), diseñado para estimular la liberación natural de hormona de crecimiento.",
    use: "Se utiliza en protocolos orientados a reducir la grasa visceral, favorecer la masa muscular magra, mejorar la recuperación y apoyar una composición corporal saludable.",
    benefits:<ul>
      <li>Pérdida significativa de grasa abdominal.</li>
      <li>Desarrollo y mantenimiento de masa muscular magra.</li>
      <li>Ayuda a una mejor recuperación despues de entrenamientos.</li>
      <li>Mejora el metabolismo en general.</li>
          </ul>
        },

        "mt2-10": {
    title: "MT2 - 10mg",
    moleculeImage: "/estrucmolemt2.jpg",
    what: "Melanotan II (MT-2) es un péptido sintético que actúa sobre los receptores de melanocortina para estimular la producción de melanina en la piel.",
    use: "Se utiliza en protocolos orientados a favorecer un bronceado más uniforme, apoyar la pigmentación de la piel y reducir la necesidad de exposición prolongada al sol.",
    benefits:<ul>
      <li>Favorece la producción natural de melanina.</li>
      <li>Ayuda a lograr un bronceado más uniforme.</li>
      <li>Puede reducir el tiempo de exposición al sol necesario para broncearse.</li>
      <li>Utilizado en protocolos de ANTI-AGING y estética bajo supervisión profesional.</li>
          </ul>
        },

  "reta-5": {
    title: "RETA - GLP1+GIP+GLUCAGON - 5mg",
    moleculeImage: "/estrucmolereta.jpg",
    what: "La Retatrutida es un péptido de nueva generación que actúa como agonista triple de GLP-1, GIP y Glucagón.",
    use: "Se usa en protocolos para control de peso, desórdenes metabólicos, diabetes tipo 2, para regular el control del apetito.",
    benefits:<ul>
      <li>Pérdida significativa de peso.</li>
      <li>Disminución del apetito y antojos.</li>
      <li>Control de niveles de glucosa.</li>
      <li>Aumenta el metabolismo lo que lleva a una quema de calorías mas alta.</li>
      <li>Posible beneficio cardiovascular. </li>
    </ul>
        },

          "glow": {
    title: "GLOW",
    moleculeImage: "/estrucmoleglow.jpg",
    what: "Es una perfecta combinación de péptidos diseñada para una mejor regeneración, reparación de la piel y otros tejidos, a nivel celular.",
    use: "Se utiliza en protocolos enfocados en ANTI-AGING, rejuvenecimiento, reducción de inflamación, para obtener un pelo, piel y uñas firmes, brillosos y saludables.",
    benefits:<ul>
      <li>Altamente ANTI-AGING.</li>
      <li>Regresa el GLOW natural de tu piel.</li>
      <li>Reduce las líneas finas de la piel.</li>
      <li>Forma una piel mas firme y un cabello mas brillante.</li>
      <li>Efectos anti-inflamatorios en general.</li>
      
    </ul>
        },

         "reta-10": {
    title: "RETA GLP1+GIP+GLUCAGON 10mg",
    moleculeImage: "/estrucmolereta.jpg",
    what: "La Retatrutida es un péptido de nueva generación que actúa como agonista triple de GLP-1, GIP y Glucagón.",
    use: "Se usa en protocolos para control de peso, desórdenes metabólicos, diabetes tipo 2, para regular el control del apetito.",
    benefits:<ul>
      <li>Pérdida significativa de peso.</li>
      <li>Disminución del apetito y antojos.</li>
      <li>Control de niveles de glucosa.</li>
      <li>Aumenta el metabolismo lo que lleva a una quema de calorías mas alta.</li>
      <li>Posible beneficio cardiovascular. </li>
      
    </ul>
        },

        "dsip-5": {
    title: "DSIP - 5mg",
    moleculeImage: "/estrucmoledsip.jpg",
    what: "DSIP(Delta Sleep Inducing Peptide) es un péptido natural asociado con la regulación del sueño, especialmente el sueño profundo (fase delta), la cual es clave para la recuperación física y mental.",
    use: "Se utiliza en protocolos enfocados en mejorar la calidad del sueño, maximizar la recuperación durante el sueño, reducir estrés y fatiga mental.",
    benefits:<ul>
      <li>Mejora la calidad del sueño.</li>
      <li>Reduce el estrés.</li>
      <li>Reduce la fatia mental.</li>
      <li>Maximiza la recuperación del cuerpo durante el sueño.</li>
      <li>Reduce la ansiedad.</li>
      
    </ul>
        },

        "motsc-10": {
    title: "MOTS-C - 10mg",
    moleculeImage: "/estrucmolemotsc.jpg",
    what: "MOTS-C es un péptido derivado de las mitocondrias (la “central de energía” de la célula) que participa en la regulación del metabolismo energético y la utilización de nutrientes.",
    use: "Se utiliza en protocolos enfocados en maximizar el uso de grasas (Lipotrópico), aumentar la producción de energia, mejorar el rendimiento físico durante entrenos, altamente ANTI-AGING.",
    benefits:<ul>
      <li>Altamente ANTI-AGING.</li>
      <li>Ayuda a perder grasa corporal (LIPOTRÓPICO).</li>
      <li>Aumenta los niveles de energía a nivel celular.</li>
      <li>Maximiza el rendimiento físico durante entrenos.</li>
      <li>Mejora la sensibilidad a la insulina.</li>
      
    </ul>
        },

        "lipoc-10": {
    title: "LIPO-C - 10ml",
    moleculeImage: "/estrucmolelipoc.jpg",
    what: "Es una perfecta combinación LIPOTRÓPICA  diseñada para maximizar el metabolismO de las grasas y aumentar los niveles de energía corporal.",
    use: "Se utiliza en protocolos enfocados en aumentar y maximizar la perdida de grasa corporal, aumentar los niveles de energía, como complemento de programas para pérdida de peso.",
    benefits:<ul>
      <li>Maximiza la quema de grasas, altamente LIPOTRÓPICO.</li>
      <li>Ayuda a utilizar las grasas como energía durante entrenos.</li>
      <li>Aumenta la energía y reduce la fatiga.</li>
      <li>Tiene efecto DETOX ayudando a mantener una función hepática saludable.</li>
            
    </ul>
        },

        "bacwa-10": {
    title: "BAC WATER - 10ml",
    moleculeImage: "/estrucmolebacwa.jpg",
    what: "BAC WATER es agua estéril bacteriostática que contiene una pequeña cantidad de alcohol bencílico (0.9%), utilizado para ayudar a prevenir el crecimiento bacteriano despues de la reconstitución de un péptido. ",
    use: "Ideal para la reconstitución de péptidos, para prevenir crecimiento bacteriano despues de reconstituir cualquier péptido liofilizado.",
    benefits:<ul>
      <li>Prevención de crecimiento bacteriano en tus péptidos.</li>
      <li>Una mejor estabilidad en el péptido reconstituido.</li>
      <li>Facilita la dosificación precisa.</li>
      <li>Vial de 10m que permite múltiples extracciones.</li>
            
    </ul>
        },


            
 

       "ghkcu-50": {
    title: "GHK-Cu - 50mg",
    moleculeImage: "/estrucmolechkcu.jpg",
    what: "Conocido popularmente como LA FUENTE DE LA JUVENTUD, el GHK-Cu es un péptido natural formado por 3 aminoácidos unidos a cobre. Está relacionado con la regeneración de dejidos, producción de colágeno y reparación celular.",
    use: "Se usa en protocolos para reparación a nivel celular, procesos ANTI-AGING, estimulación de folículos de cabello para que crezca sano y brilloso, estimulación de producción de colágeno para una piel sana y con un GLOW saludable.",
    benefits:<ul>
      <li>Efecto altamente ANTI-AGING.</li>
      <li>Ayuda a una regeneración de la piel mas saludable.</li>
      <li>Ayuda a tener un cabello mas sano.</li>
      <li>Ayuda a la reparación celular.</li>
      <li>Estimula la producción de colágeno.</li>
        
            </ul>
        },

            "cjcipa-5": {
    title: "CJC-1295 + IPAMORELIN",
    moleculeImage: "/estrucmolecjcipa.jpg",
    what: "El CJC-1295 es un péptido análogo de la hormona liberadora de la hormona de crecimiento (GHRH), diseñado para estimular la producción natural de la hormona de crecimiento en el cuerpo. Ipamorelin es un péptido que actúa estimulando la liberación de hormona de crecimiento. La combinación es ideal porque ambos trabajan en vías diferentes pero complementarias, uno le dice al cuerpo que produzca y el otro maximiza la liberación.",
    use: "Esta combinación se usa en protocolos enfocados en aumento de masa muscular magra, una mejor recuperación corporal despues de entrenar, un mejor descanso muscular y como ANTI-AGNING.",
    benefits:(
    <ul className="list-disc  space-y-2 pl-5">
      <li>Aumento de masa muscular.</li>
      <li>ANTI-AGING.</li>
      <li>Maximiza la recuperación muscular y da un mejor descanso.</li>
      <li>Reduce la grasa corporal.</li>
      <li>Mejora la calidad de sueño.</li>    
        
            </ul>
    ),
        },

         "sema-5": {
    title: "Sema-GLP1 - 5mg",
    moleculeImage: "/estrucmolesema.jpg",
    what: "Semaglutida es un agonista del GLP-1, con esto reduce el apetito, aumenta la saciedad, mejora el control de la glucosa.",
    use: "Se usa en protocolos para control de peso, ayuda en tratamientos de diabetes y otros trastornos metabólicos.",
    benefits:<ul>
      <li>Pérdida de peso progresiva y sostenida.</li>
      <li>Disminución del apetito y antojos.</li>
      <li>Control de niveles de glucosa.</li>
      <li>Mayor sensación de saciedad.</li>
      <li>Posible beneficio cardiovascular.</li>
        
            </ul>
        },

          "tirz-5": {
    title: "Tirze-GLP1+GIP- 10mg",
    moleculeImage: "/estrucmoletirze.jpg",
    what: "Tirzepatida es un péptido que actúa como agonista dual de GLP-1 y GIP, dos hormonas involucradas en el control del apetito, la saciedad y el metabolismo.",
    use: "Se usa en protocolos para control de peso, ayuda en tratamientos de diabetes tipo 2, regulación del apetito y otros trastornos metabólicos.",
    benefits:<ul>
      <li> Pérdida de peso significativa y sostenida.</li>
      <li>Disminución del apetito y antojos.</li>
      <li>Control de niveles de glucosa.</li>
      <li>Mayor sensación de saciedad.</li>
      <li>Posible beneficio cardiovascular.</li>
        
            </ul>
        },

        "tirz-vial-17p2mgml-2ml": {
    title: "Tirze-GLP1+GIP+B3 12/2mg/ml",
    moleculeImage: "/estrucmoletirzeb3.jpg",
    what: "Tirzepatida es un péptido que actúa como agonista dual de GLP-1 y GIP, dos hormonas involucradas en el control del apetito, la saciedad y el metabolismo. La Niacinamide se usa como apoyo en el metabolismo energético, ayudando en la producción de energía celular y en el buen funcionamiento del sistema nervioso. ",
    use: "Se usa en protocolos para control de peso, ayuda en tratamientos de diabetes tipo 2, regulación del apetito y otros trastornos metabólicos y al mismo tiempo ayudando a mejorar la adherencia al tratamiento.",
    benefits:<ul>
      <li> Pérdida de peso progresiva y sostenida.</li>
      <li>Disminución del apetito y antojos.</li>
      <li>Control de niveles de glucosa.</li>
      <li>Mayor sensación de saciedad.</li>
      <li>Posible beneficio cardiovascular.</li>
      <li>Aumento de energía celular y reducción de fatiga en general.</li>
        
            </ul>
        },

        "bpc157-10": {
    title: "BPC-157 - 10mg",
    moleculeImage: "/estrucmolebpc157.jpg",
    what: "El BPC-157 es un péptido compuesto por 15 aminoácidos, derivado de proteínas presentes en el sistema gastrointestinal. Es conocido por su relación con procesos de reparación y regeneración de tejidos.",
    use: "Se usa en protocolos enfocados en recuperación muscular, lesiones de tendones y ligamentos, anti-inflamatorio, para una recuperación despues de entrenos.",
    benefits:<ul>
      <li> Ayuda a la reparación de tejidos.</li>
      <li>Acelera la recuperación de lesiones.</li>
      <li>Ayuda a mantener los tendones y ligamentos saludables.</li>
      <li>Tiene propiedades anti-inflamatorias.</li>
      <li>Tiene propiedades que mantienen una buena salud gastrointestinal.</li>
        
            </ul>
        },
        
        "tb500-10": {
    title: "TB-500 - 10mg",
    moleculeImage: "/estrucmoletb500.jpg",
    what: "El TB-500 es un péptido derivado de la timosina beta-4, una proteína natural involucrada en procesos de reparación y regeneración celular.",
    use: "Se usa en protocolos enfocados en recuperación muscular, lesiones de tendones y ligamentos, anti-inflamatorio, para una recuperación despues de entrenos.",
    benefits:<ul>
      <li> Ayuda a la reparación de tejidos.</li>
      <li>Acelera la recuperación de lesiones.</li>
      <li>Ayuda a mantener los tendones y ligamentos saludables.</li>
      <li>Tiene propiedades anti-inflamatorias.</li>
      <li>Mantiene una flexibilidad y motilidad sana.</li>
        
            </ul>
        },

        "nad-1000": {
    title: "NAD+ - 1,000mg",
    moleculeImage: "/estrucmolenad.jpg",
    what: "El NAD+ es una coenzima escencial presente en todas las células del cuerpo. Participa en procesos clave de producción de energía, procesos antioxidantes y metabolismo celular.",
    use: "Se utiliza en protocolos enfocados en ANTI-AGING, aumento de la energía celular, aumento de la claridad mental, apoyo en el metabolismo celular, ayuda a una recuperación celular mas sana.",
    benefits:<ul>
      <li>ANTI-AGING </li>
      <li>Mejora la función celular y metabolica.</li>
      <li>Aumenta la claridad mental y la concentración.</li>
      <li>Ayuda a una reparación celular mas saludable.</li>
      <li>Aumenta la producción de energía - ATP-.</li>
        
            </ul>
        },

     

        "nr-500": {
    title: "NR-500 - 500mg",
    moleculeImage: "/estrucmolenr.jpg",
    what: "La Nicotinamida Ribosida o NR, es una forma de vitamina B3 que el cuerpo utiliza como precursor directo de NAD+ una molécula clave para la producción de energía celular.",
    use: "Se utiliza en protocolos enfocados en aumentar niveles de NAD+, ANTI-AGING, aumento de la claridad mental y conectración, aumento de la energía",
    benefits:<ul>
      <li>ANTI-AGING </li>
      <li>Mejora la función celular y metabólica.</li>
      <li>Aumenta la claridad mental y la concentración.</li>
      <li>Aumenta los niveles de energía.</li>
      <li>Aumenta la producción de NAD+</li>
        
            </ul>
        },                

          "sema-vial-12p5-5ml": {
    title: "Sema-GLP1 - 2.5mg/ml",
    moleculeImage: "/estrucmolesema.jpg",
    what: "Semaglutida es un agonista del GLP-1, con esto reduce el apetito, aumenta la saciedad, mejora el control de la glucosa.",
    use: "Se usa en protocolos para control de peso, ayuda en tratamientos de diabetes y otros trastornos metabólicos.",
    benefits:<ul>
      <li> Pérdida de peso progresiva y sostenida.</li>
      <li>Disminución del apetito y antojos.</li>
      <li>Control de niveles de glucosa.</li>
      <li>Mayor sensación de saciedad.</li>
      <li>Posible beneficio cardiovascular.</li>
        
            </ul>
        },

        
          "pachon1": {
    title: "Botella de agua con aislamiento térmico",
    moleculeImage: "/pachon1-2.jpeg",
    what: "Botella de agua con aislamiento de aluminio, mantiente el contenido frío, mide 24 pulgadas, Durable, BPA Free, Leak Proof y facil de lavar.",
    use: "Ideal para llevar a gimnasio, mantener tu agua fría, ideal para mezclar tu creatina, tambien para shakes de proteína. Portatil y cabe en cualquier mochila.",
    benefits:<ul>
      <li> Insulated aluminum.</li>
      <li>Keeps COLD drinks.</li>
      <li>Portable.</li>
      <li>Ready for on the go.</li>
      <li>Easy to clean.</li>
        
            </ul>
        },

         "bolsa1": {
    title: "Tote Bag AminoPro-MD",
    moleculeImage: "/bolsa1-2.jpeg",
    what: "Una bolsa suave y resistente diseñada para durar y aguantar tu equipo, como guantes, toallas, pachones, tennis, etc. Facil de lavar y secar.",
    use: "Ideal para guardar tu equipo de workout cuando vas al gimnasio, mantiene fresco tu equipo y ventilado, suave y ligera de llevar.",
    benefits:<ul>
      <li>Medidas: 35 × 45 pulgadas.</li>
      <li>Asas de aproximadamente 29 pulgadas.</li>
      <li>Tejido de polipropileno reciclable y reutilizable.</li>
      <li>Ligera, cómoda y fácil de transportar.</li>
      <li>Fácil de lavar y secar.</li>
        
            </ul>
        },

        "estuche1": {
    title: "Estuche AminoPro-MD Magnético para Péptidos.",
    moleculeImage: "/estuche1-2.jpeg",
    what: "Estuche portátil con cierre magnético, diseñado para almacenar y proteger de forma segura hasta 6 viales de péptidos. Su diseño moderno, compacto y resistente lo hace ideal para el uso diario.",
    use: "Se utiliza para organizar, transportar y mantener tus viales protegidos en casa, en el gimnasio o durante tus viajes, evitando golpes y desorden.",
    benefits:<ul>
      <li>Medidas: H 3 pulgadas x W 3.5 pulgadas D 3 pulgadas.</li>
      <li>Capacidad para 6 viales.</li>
      <li>Cierre magnético para mayor seguridad.</li>
      <li>Diseño cmpacto, moderno y ligero.</li>
      <li>Protege y organiza tus péptidos.</li>
        
            </ul>
        },
};




function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-muted-foreground">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="AminoPro-MD" className="h-8 w-auto" />
            <p>
              © {new Date().getFullYear()} AminoPro-MD. Propiedad de NeoG Pro,
              LLC. Todos los derechos reservados.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/aminopromd502" target="_blank" rel="noreferrer">
              <img src="/Social/instagram.png" alt="Instagram" className="h-8 w-auto" />
            </a>

            <a href="https://www.facebook.com/aminopromd" target="_blank" rel="noreferrer">
              <img src="/Social/facebook.png" alt="Facebook" className="h-8 w-auto" />
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

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  const product = PRODUCTS.find((p) => p.id === id);

  const [qty, setQty] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("aminopromd-cart");
    const currentCart = saved ? JSON.parse(saved) : {};
    setQty(currentCart[id] || 0);
  }, [id]);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Producto no encontrado</h1>
          <Link href="/" className="text-green-600 underline mt-4 block">
            Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  const price = product.price;
  const total = typeof price === "number" ? qty * price : 0;
  const image = `/Products/${product.id}.jpeg`;

  const info = PRODUCT_INFO[product.id] || {
    title: product.name,
    what: `${product.name} es parte del catálogo de AminoPro-MD dentro de la categoría ${product.category}.`,
    use: product.bullets?.join(" ") || "Uso dentro de un plan supervisado.",
    benefits:
      "Puede apoyar objetivos específicos de bienestar, rendimiento o recuperación dependiendo del protocolo indicado.",
  };

  const updateCart = (newQty: number) => {
    const saved = localStorage.getItem("aminopromd-cart");
    const currentCart = saved ? JSON.parse(saved) : {};

    if (newQty <= 0) {
      delete currentCart[product.id];
      setQty(0);
    } else {
      currentCart[product.id] = newQty;
      setQty(newQty);
    }

    localStorage.setItem("aminopromd-cart", JSON.stringify(currentCart));
  };

  const buildCheckoutMessage = () => {
    return `Hola, AminoPro-MD, quiero confirmar esta orden:

• ${product.name} x${qty} = ${total}

TOTAL (USD): ${total}

Datos del cliente
Nombre Completo:
Dirección completa a enviar la orden:
Correo electrónico:
Teléfono:

Método de pago:
PayPal

Nota:`;
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="sticky top-0 z-50 border-b border-green-400 bg-white/90 backdrop-blur">
        <div className="w-full px-6 md:px-12 py-3 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.jpeg" alt="AminoPro-MD" className="h-12 w-auto" />
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium hover:text-green-600">
              Inicio
            </Link>

            <a href="https://www.instagram.com/aminopromd502" target="_blank" rel="noreferrer">
              <img src="/Social/instagram.png" alt="Instagram" className="h-9 w-auto" />
            </a>

            <a href="https://www.facebook.com/aminopromd" target="_blank" rel="noreferrer">
              <img src="/Social/facebook.png" alt="Facebook" className="h-9 w-auto" />
            </a>
          </div>
        </div>
      </nav>

      <section className="w-full px-6 md:px-12 py-10">
        <Link href="/" className="text-lime-400 text-sm font-semibold">
          ← Volver al catálogo
        </Link>

        <div className="text-center mt-6">
          <p className="text-lime-400 text-xl font-semibold uppercase tracking-widest">
            {product.category}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            {info.title || product.name}
          </h1>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            La información presentada en este sitio web es exclusivamente para fines educativos. Los productos listados son únicamente para fines de investigación y no se recomienda su uso en humanos. Consulta a tu médico. 
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-10 border border-green-200 rounded-3xl p-6 md:p-8 shadow-lg w-full">
          <div className="flex justify-center items-center">
            <Image
              src={image}
              alt={product.name}
              width={560}
              height={560}
              className="rounded-2xl object-contain w-full max-w-[560px]"
            />
          </div>

          <div className="text-center md:text-left flex flex-col justify-center">
            {info.moleculeImage && (
              <div className="flex justify-center mb-4">
                <img
                  src={info.moleculeImage}
                  alt="Estructura molecular"
                  className="h-80 md:h-70s object-contain opacity-80"
                />
              </div>
            )}

            <h2 className="text-2xl md:text-3xl font-bold">{product.name}</h2>

            <ul className="mt-4 space-y-2 text-gray-600">
              {product.bullets?.map((b, index) => (
                <li key={index}>{b}</li>
              ))}
            </ul>

            <div className="mt-6 bg-lime-100 border border-lime-300 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600">Precio</p>
              <p className="text-2xl font-semibold">
                {typeof price === "number" ? `$${price}` : "Más info"}
              </p>
              <p className="text-xs text-gray-600">USD</p>
            </div>

            {typeof price === "number" && (
              <button
                onClick={() => updateCart(qty + 1)}
                className="w-full mt-6 text-center bg-lime-300 p-4 rounded-xl font-bold hover:bg-lime-500 transition cursor-pointer"
              >
                Agregar al carrito
              </button>
            )}

            {qty > 0 && (
              <div className="mt-6 rounded-2xl border border-lime-300 bg-lime-50 p-5 text-center">
                <h3 className="font-bold text-xl">Carrito</h3>

                <p className="mt-2 text-gray-700">
                  {product.name} x {qty}
                </p>

                <p className="mt-2 font-bold text-xl">Total: ${total}</p>

                <div className="mt-4 flex justify-center items-center gap-3">
                  <button
                    onClick={() => updateCart(qty - 1)}
                    className="px-4 py-2 rounded-lg border font-bold bg-white"
                  >
                    −
                  </button>

                  <span className="font-bold">{qty}</span>

                  <button
                    onClick={() => updateCart(qty + 1)}
                    className="px-4 py-2 rounded-lg border font-bold bg-white"
                  >
                    +
                  </button>
                </div>

                <a
                  href={waLink(buildCheckoutMessage())}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-5 bg-black text-white rounded-xl p-4 font-bold hover:bg-gray-800 transition"
                >
                  Finalizar por WhatsApp
                </a>

                <Link
                  href="/#carrito"
                  className="block mt-3 text-sm font-semibold text-green-700 underline"
                >
                  Volver al carrito principal
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <div className="text-center mb-5">
              <h2 className="text-2xl font-bold">Información educativa</h2>
              <p className="text-sm text-gray-600 mt-2">
                Uso recomendado bajo supervisión médica unicamente.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border p-5 rounded-xl shadow-sm bg-white">
                <img src="/quees.jpg" alt="Qué es" className="h-10 w-10 object-contain mx-auto mb-2" />
                <h3 className="font-bold text-lg text-center">¿Qué es?</h3>
                <p className="text-sm mt-3 text-gray-600 text-center">
                  {info.what}
                </p>
              </div>

              <div className="border p-5 rounded-xl shadow-sm bg-white">
                <img src="/paraqueseusa.jpg" alt="Para qué se usa" className="h-10 w-10 object-contain mx-auto mb-2" />
                <h3 className="font-bold text-lg text-center">
                  ¿Para qué se usa?
                </h3>
                <p className="text-sm mt-3 text-gray-600 text-center">
                  {info.use}
                </p>
              </div>

              <div className="border p-5 rounded-xl shadow-sm bg-white">
                <img src="/benefits.jpg" alt="Beneficios" className="h-10 w-10 object-contain mx-auto mb-2" />
                <h3 className="font-bold text-lg text-center">
                  Beneficios
                </h3>
                <div className="text-sm mt-3 text-gray-600 text-left"></div>
                  {info.benefits}
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="aviso-legal" className="w-full px-6 md:px-12 pb-12">
        <div className="rounded-xl border p-5 text-xs text-gray-600 leading-relaxed">
          <span className="font-semibold text-black">
            Aviso legal / términos y condiciones:
          </span>{" "}
          Este sitio web no ofrece atención médica de emergencia. La información
          contenida en este sitio se proporciona únicamente con fines educativos
          e informativos y no sustituye una evaluación médica presencial,
          diagnóstico clínico ni tratamiento médico. Los resultados pueden variar
          según cada persona. Al acceder a este sitio web, realizar una orden o
          utilizar los servicios de AminoPro-MD, el usuario declara y garantiza
          que tiene al menos veintiuno (21) años de edad y que actúa de manera
          voluntaria y bajo su propia responsabilidad. Los productos ofrecidos en
          este sitio están clasificados como suplementos dietéticos (“dietary
          supplements”) conforme a la normativa vigente y, como tales, no
          requieren aprobación previa por parte de la Administración de Alimentos
          y Medicamentos de los Estados Unidos (FDA). Asimismo, algunos productos
          pueden estar destinados exclusivamente para fines de investigación
          (“research use only”) y no están destinados a diagnosticar, tratar,
          curar o prevenir ninguna enfermedad. El acceso o uso de este sitio web
          no establece una relación médico-paciente entre el usuario y
          AminoPro-MD o cualquiera de sus profesionales afiliados. Dicha relación
          solo se establece tras la realización de una consulta médica virtual.
          El usuario reconoce y acepta que el uso, manejo, almacenamiento,
          dosificación y administración de cualquier producto adquirido a través
          de AminoPro-MD se realiza bajo su exclusiva responsabilidad.
          AminoPro-MD no garantiza resultados específicos o resultados
          terapéuticos derivados del uso de cualquier producto o protocolo.
          AminoPro-MD, así como sus propietarios, directivos, empleados,
          contratistas, afiliados y proveedores médicos, no asumen
          responsabilidad alguna por daños, pérdidas, efectos adversos o
          reclamaciones derivadas del uso indebido, incorrecto o no conforme a
          las indicaciones proporcionadas. En ningún caso AminoPro-MD será
          responsable por daños directos, indirectos, incidentales, especiales o
          consecuenciales derivados del uso o imposibilidad de uso de los
          productos o servicios ofrecidos. Las consultas médicas virtuales,
          cuando aplican, se realizan bajo consentimiento informado y no
          sustituyen la atención médica primaria o de emergencia. Se recomienda
          que el usuario consulte con su proveedor de atención médica autorizado
          antes de iniciar el uso de cualquier producto o protocolo adquirido a
          través de este sitio. La información personal proporcionada por el
          usuario será tratada de manera confidencial y utilizada únicamente con
          fines administrativos, clínicos y de seguimiento, basandose a lo
          establecido por la Ley HIPPA de los Estados Unidos y demás normativa
          aplicable. Todas las ventas son finales. Todos los pagos son
          definitivos, no reembolsables, no transferibles y no cancelables,
          independientemente del uso del producto o de los resultados obtenidos.
          Al utilizar este sitio web, el usuario confirma que ha leído,
          comprendido y aceptado estos términos y condiciones.
        </div>
      </section>

      <Footer />
    </main>
  );
}