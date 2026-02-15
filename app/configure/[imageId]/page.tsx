import { ProductConfigurator } from "@/components/configure/product-configurator"

export const metadata = {
  title: "Configure Your Print | Muse",
  description: "Choose your size, medium, frame, and matting. See your art in a room mockup. Add to cart.",
}

export default async function ConfigurePage({ params }: { params: Promise<{ imageId: string }> }) {
  const { imageId } = await params
  return <ProductConfigurator imageId={imageId} />
}
