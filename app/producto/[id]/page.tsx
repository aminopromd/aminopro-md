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
  "reta-5": {
    title: "RETA - GLP1+GIP+GLUCAGON - 5mg",
    moleculeImage: "/estrucmolereta.jpg",
    what: "La Retatrutida es un péptido de nueva generación que actúa como agonista triple de GLP-1, GIP y Glucagón.",
    use: "Se usa en protocolos para control de peso, desórdenes metabólicos, diabetes tipo 2, para ayuda a regular el apetito.",
    benefits:<ul>
      <li>Pérdida significativa de peso.</li>
      <li>Disminución del apetito y antojos.</li>
      <li>Control de niveles de glucosa.</li>
      <li>Aumenta el metabolismo lo que lleva a una quema de calorías mas alta.</li>
      <li>Posible beneficio cardiovascular. </li>
    </ul>
        },

        
  "semab12-5": {
    title: "Sema + B12 - 5/0.5 mg/ml",
    moleculeImage: "/estrucmolesemab12.jpg",
    what: "Semaglutida es un agonista del GLP-1, con esto reduce el apetito, aumenta la saciedad, mejora el control de la glucosa. La Vitamina B12, tambien conocida como Cobalamina, ayuda a la producción de energía a nivel celular, participa en formación de globulos rojos, ayuda al buen funcionamiento del sistema nervioso.",
    use: "Se usa en protocolos para control de peso, ayuda en tratamientos de diabetes, aumentando los niveles de energía y mantieninedo un sistema nervioso saludable.",
    benefits:<ul>
      <li> Pérdida de peso progresiva y sostenida.</li>
      <li>Disminución del apetito y antojos.</li>
      <li>Control de niveles de glucosa.</li>
      <li>Mayor sensación de saciedad.</li>
      <li>Reducción de fatiga. 
      <li>Previene déficits vitamínicos
      </li>Posible beneficio cardiovascular. </li>
    </ul>
        },

        "ghkcu-50": {
    title: "GHK-Cu - 50mg",
    moleculeImage: "/estrucmolechkcu.jpg",
    what: "Conocido popularmente como LA FUENTE DE LA JUVENTUD, el GHK-Cu es un péptido natural formado por 3 aminoácidos unidos a cobre. Está relacionado con la regeneración de dejidos, producción de colágeno y reparación celular.",
    use: "Se usa en protocolos para reparación a nivel celular, procesos ANTI-AGING, estimulación de folículos de cabello para que crezca sano y brilloso, estimulación de producción de colágeno para una piel sana y con un GLOW saludable.",
    benefits:<ul>
      <li>Estimula la producción de colágeno.</li>
      <li>Ayuda a una regeneración de la piel mas saludable.</li>
      <li>Ayuda a tener un cabello mas sano.</li>
      <li>Ayuda a la reparación celular.</li>
      <li>Efecto altamente ANTI-AGING.</li>
        
            </ul>
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

        "nad-vial-1000mgml-10ml": {
    title: "NAD+ - 100mg/ml",
    moleculeImage: "/estrucmolenad.jpg",
    what: "El NAD+ es una coenzima escencial presente en todas las células del cuerpo. Participa en procesos clave de producción de energía, procesos antioxidantes y metabolismo celular.",
    use: "Se utiliza en protocolos enfocados en ANTI-AGNING, aumento de la energía celular, aumento de la claridad mental, apoyo en el metabolismo celular, ayuda a una recuperación celular mas sana.",
    benefits:<ul>
      <li>ANTI-AGING </li>
      <li>Mejora la función celular y metabólica.</li>
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

        "lcarn-500mgml-30ml": {
    title: "L-Carnitina",
    moleculeImage: "/estrucmolecarni.jpg",
    what: "L-Carnitina es una molécula derivada de aminoácidos que participa en el transporte de ácidos grasos hacia las mitocondrias, donde se utilizan para producir energía.",
    use: "Se utiliza en protocolos enfocados aumentar energía y rendimiento físico, maximizar el metabolismo de grasas, ayuda a protocolos para control de peso, para recuperación muscular y da apoyo al sistema metabólico.",
    benefits:<ul>
      <li>Ayuda a protocolos para perder peso.</li>
      <li>Favorece el uso de grasa como fuente de energía.</li>
      <li>Aumenta niveles de energía y el rendimiento durante el entrenamiento.</li>
      <li>Apoya a la recuperación muscular.</li>
      <li>Maximiza el metabolismo energético.</li>
        
            </ul>
        },

         "gluta-200mgml-30ml": {
    title: "Glutatión",
    moleculeImage: "/estrucmolegluta.jpg",
    what: "El Glutatión es un antioxidante natural producido por el cuerpo, compuesto por 3 aminoácidos. Este es responsable de proteger las células del daño oxidativo.",
    use: "Se utiliza en protocolos enfocados ANTI-AGING, detoxificación del organismo, apoyo al sistema inmmune, protección celular, para una piel mas saludable.",
    benefits:<ul>
      <li>ANTI-AGING.</li>
      <li>Detox.</li>
      <li>Aumenta el GLOW natural de la piel.</li>
      <li>Protección celular contra daño ambiental.</li>
      <li>Mejora la tonificación de la piel.</li>
        
            </ul>
        },

        "arginine200-30ml": {
    title: "L-Arginina",
    moleculeImage: "/estrucmoleargi.jpg",
    what: "L-Arginina es un aminoácido que el cuerpo utiliza para producir óxido nítrico, una molécula clave para la vasodilatación y el flujo sanguíneo.",
    use: "Se utiliza en protocolos enfocados en aumentar el rendimiento físico, mejorar la circulación, apoyo al sistema cardiovascular, mejorar las salud sexual.",
    benefits:<ul>
      <li>Aumenta el rendimiento físico durante entrenamientos.</li>
      <li>Mejora la salud sexual.</li>
      <li>Favorece la vasodilatación y mejora flujo sanguíneo.</li>
      <li>Mantiene un sistema cardiovascular mas saludable.</li>
            
            </ul>
        },

          "aminoblend-30ml2": {
    title: "Amino Blend",
    moleculeImage: "/estrucmoleaminob.jpg",
    what: "Es una perfecta combinación de aminoácidos que incluye, L-Carnitina, L-Arginina, L-Citrulina, L-Lisina y L-Prolina, diseñada para maximizar el rendimiento físico durane entrenos, la recuperación del cuerpo y mejora el metabolismo en general.",
    use: "Se utiliza en protocolos enfocados en maximizar el rendimiento físico durante entrenos, mejorar la circulación, maximizar la recuperación muscular, aumenta la producción de energía y mantiene tejidos conectivos y musculares saludables.  ",
    benefits:<ul>
      <li>Maximiza el rendimiento físico.</li>
      <li>Mejora la circulación y flujo sanguíneo.</li>
      <li>Maximiza la recuperación muscular.</li>
      <li>Aumenta la producción de energía.</li>
      <li>Mantiene tejidos saludables y aumenta la producción de colágeno. </li>
        
            </ul>
        },

        "zinc10": {
    title: "Zinc-10 mg/ml",
    moleculeImage: "/estrucmolezinc.jpg",
    what: "El Zinc es un mineral escencial que el cuerpo necesita para múltiples funciones biológicas, especialmente en el sistema inmunológico, en la reparación celular y el metabolismo en general.",
    use: "Se utiliza en protocolos enfocados en fortalecer el sistema inmunológico, una mejor recuperación y reparación celular, una piel saludable y en prevención de deficiencias vitamínicas.",
    benefits:<ul>
      <li>Fortalece el sistema inmunológico.</li>
      <li>Ayuda a una mejor cicatrización y reparación de tejidos.</li>
      <li>Ayuda a tener una piel mas saludable.</li>
      <li>Efectos anti-inflamatorios.</li>
      <li>Ayuda al metabolismo general celular.</li>
        
            </ul>
        },

        "bpc157-sl": {
    title: "BPC-157 Sublingual",
    moleculeImage: "/estrucmolebpc157.jpg",
    what: "El BPC-157 es un péptido compuesto por 15 aminoácidos, derivado de proteínas presentes en el sistema gastrointestinal. Es conocido por su relación con procesos de reparación y regeneración de tejidos.",
    use: "Esta opción SUBLINGUAL, se usa en protocolos enfocados en recuperación muscular, lesiones de tendones y ligamentos, anti-inflamatorio, para una recuperación despues de entrenos.",
    benefits:<ul>
      <li> Ayuda a la reparación de tejidos.</li>
      <li>Acelera la recuperación de lesiones.</li>
      <li>Ayuda a mantener los tendones y ligamentos saludables.</li>
      <li>Tiene propiedades anti-inflamatorias.</li>
      <li>Tiene propiedades que mantienen una buena salud gastrointestinal.</li>
      <li>No es inyectable.</li>    
        
            </ul>
        },

        "ta1-sl": {
    title: "Thymosin Alpha-1 Sublingual",
    moleculeImage: "/estrucmoleta1sl.jpg",
    what: "El thymosin alpha-1, es un péptido compuesto por 28 aminoácidos que actúa como modulador del sistemas inmunológico, ayudando a regular la respuesta inmune del cuerpo, a tener un sistema inmunológico mas fuerte.",
    use: "Esta opción SUBLINGUAL, se usa en protocolos enfocados en fortalecer el sistema inmune, ayuda a combatir ciertas infecciones, salud a nivel celular, una mejor recuperación del cuerpo y a regular el sistema inmune.",
    benefits:<ul>
      <li>Fortalece la respuesta del sistema inmunológico.</li>
      <li>Ayuda en la defensa del cuerpo con infecciones.</li>
      <li>Maximiza la recuperación en general del cuerpo.</li>
      <li>Mantiene un sistema inmune en equilibrio.</li>
      <li>No es inyectable.</li>    
        
            </ul>
        },

          "pt141-sl": {
    title: "PT-141+ Sublingual",
    moleculeImage: "/estrucmolept141sl.jpg",
    what: "La Bremelanotida o PT-141+, es un péptido que actúa sobre los receptores de melanocortina en el sitema nervioso central, relacionados con el deseo sexual.",
    use: "Esta opción SUBLINGUAL, se usa en protocolos enfocados en disfunción sexual, líbido bajo, mejora la respuesta y deseo sexual, mejora la salud sexual.",
    benefits:<ul>
      <li>Mejora la salud sexual.</li>
      <li>Aumenta la respuesta y el deseo sexual.</li>
      <li>Actúa a nivel central.</li>
      <li>Funciona tanto en hombres como en mujeres.</li>
      <li>No es inyectable.</li>    
        
            </ul>
        },

           "cjc1295-sl": {
    title: "CJC-1295 Sublingual",
    moleculeImage: "/estrucmolecjc.jpg",
    what: "El CJC-1295 es un péptido análogo de la hormona liberadora de la hormona de crecimiento (GHRH), diseñado para estimular la producción natural de la hormona de crecimiento en el cuerpo.",
    use: "Esta opción SUBLINGUAL, se usa en protocolos enfocados en aumento de masa muscular magra, una mejor recuperación corporal despues de entrenar, un mejor descanso muscular y como ANTI-AGNING.",
    benefits:<ul>
      <li>Aumento de masa muscular.</li>
      <li>ANTI-AGING.</li>
      <li>Maximiza la recuperación muscular y da un mejor descanso.</li>
      <li>Reduce la grasa corporal.</li>
      <li>No es inyectable.</li>    
        
            </ul>
        },

        "ghkcu-sl": {
    title: "GHK-Cu Sublingual",
    moleculeImage: "/estrucmolechkcu.jpg",
    what: "Conocido popularmente como LA FUENTE DE LA JUVENTUD, el GHK-Cu es un péptido natural formad por 3 amino ácidos unidos a cobre. Está relacionado con la regeneración de dejidos, producción de colágeno y reparación celular.",
    use: "Esta opción SUBLINGUAL, se usa en protocolos para reparación a nivel celular, procesos ANTI-AGING, estimulación de folículos de cabello para que crezca sano y brilloso, estimulación de producción de colágeno para una piel sana y con un GLOWQ saludable.",
    benefits:<ul>
      <li>Efecto Altamente ANTI-AGING. Estimula la producción de colágeno.</li>
      <li>Ayuda a una regeneración de la piel mas saludable.</li>
      <li>Ayuda a tener un cabello mas sano.</li>
      <li>Ayuda a la reparación celular.</li>
      <li>Estimula la producción de colágeno.</li>
      <li>No es inyectable.</li>
        
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
            <a href="https://www.instagram.com/aminopromd" target="_blank" rel="noreferrer">
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

Método de pago preferido:
PayPal / Western Union / Money Gram / Bitcoin

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

            <a href="https://www.instagram.com/aminopromd" target="_blank" rel="noreferrer">
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
            La información presentada tiene fines exclusivamente educativos. Se recomienda que el uso de cualquier producto se realice bajo la supervisión y orientación de un médico. 
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