import { GenerateRecipe } from "@/components/generate-recipe"
import Link from 'next/link';

export default function IndexPage() {
  return (
    <div className="container grid items-center gap-4 py-3">
      <div className="mx-auto mb-2 flex max-w-5xl flex-col items-start gap-2 text-center md:mb-4">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Gurukul
          <br className='desc max-md:hidden' />
          <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
            {" AI-Powered Code Mentor"}
          </span>
        </h1>
        <h2 className="mx-auto text-xl font-semibold leading-tight tracking-tighter text-muted-foreground">
          An AI Powered Code Mentor For Students To Learn Code
        </h2>
      </div>
      <div className="flex justify-center space-x-4 mt-6">
          <Link href="/qa" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Study
          </Link>
          <Link href="/problemstable" className="bg-purple-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Practice
          </Link>
        </div>
    </div>
  )
}
