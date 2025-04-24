import { Button } from "../components/ui/button"
import Hero from "./_components/Hero"
import ProductList from "./_components/ProductList"

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="p-10 md:px-30 lg:px-42">
        <ProductList />
      </div>
    </div>
  )
}