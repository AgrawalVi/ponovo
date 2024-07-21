import { Spotlight } from '@/components/aceternity/spotlight'
import Image from 'next/image'
import darkImage from '@/assets/images/home-screenshot-dark.png'
import lightImage from '@/assets/images/home-screenshot-light.png'
import { BorderBeam } from '@/components/magicui/border-beam'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function MainHero() {
  return (
    <div>
      <div>
        <Spotlight
          className="-left-10 -top-40 h-screen md:-top-20 md:left-0"
          fill="white"
        />
        <Spotlight className="left-full top-10 h-[80vh] w-[50vh]" fill="cyan" />
      </div>
      <div className="bg-grid-black/[0.025] dark:bg-grid-white/[0.025] absolute left-0 top-0 flex h-dvh w-full items-center justify-center bg-background dark:bg-background">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-background"></div>
      </div>
      <div className="relative my-20 flex h-full justify-center space-y-20 align-middle">
        <div className="flex max-w-6xl flex-col space-y-20 text-center">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div>
              <button className="w-fit cursor-default rounded-full border px-4 py-1">
                Currently in Beta
              </button>
              <div className="font-maven bg-gradient-to-b from-foreground to-neutral-600 bg-clip-text py-4 text-8xl font-bold text-transparent dark:to-neutral-500">
                Make Job Application Tracking Easy
              </div>
            </div>
            <div className="flex justify-center">
              <div className="max-w-3xl text-2xl text-muted-foreground">
                Ponovo is a job application tracking tool that easily helps you
                visualize and manage your job applications in one unified place.
              </div>
            </div>
            <Link href="/dashboard">
              <Button className="group">
                <div className="flex items-center">
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1" />
                </div>
              </Button>
            </Link>
          </div>
          <div className="shadow-teal-intense-hero relative overflow-hidden rounded-2xl">
            <BorderBeam
              size={500}
              colorFrom="var(--cyan-400)"
              colorTo="var(--cyan-800)"
            />
            <BorderBeam
              size={500}
              colorFrom="var(--cyan-400)"
              colorTo="var(--cyan-800)"
              delay={1000}
            />
            <BorderBeam
              size={500}
              colorFrom="var(--cyan-400)"
              colorTo="var(--cyan-800)"
              delay={2000}
            />
            <Image
              src={darkImage}
              alt="Dashboard Screenshot"
              className="hidden rounded-2xl border-2 border-primary dark:block"
            />
            <Image
              src={lightImage}
              alt="Dashboard Screenshot"
              className="block rounded-2xl border-2 border-primary dark:hidden"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
