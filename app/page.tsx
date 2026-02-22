'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Sparkles, Heart, MapPin, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    dua: '',
    quranDedication: '',
    wishes: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/send-dua', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsModalOpen(true)
      } else {
        alert('Қате орын алды. Қайталап көріңіз.')
      }
    } catch (error) {
      console.error('Дұғаны жіберу қатесі:', error)
      alert('Қате орын алды. Қайталап көріңіз.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const resetForm = () => {
    setFormData({ name: '', dua: '', quranDedication: '', wishes: '' })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-serif font-semibold text-foreground">Меккеден дұға</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-balance text-foreground leading-tight">
            Дұғаңызды жіберіңіз
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            Мен сіздің дұғаңызды Меккедегі қасиетті Кағба жанында оқимын. Қажет болса Құран бағыштаймын.
          </p>
        </div>
      </section>

      {/* Hadith Quote Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/20 p-8 md:p-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                  Дұға-тілек қабыл болатын жер
                </h3>

                <blockquote className="relative">
                  <div className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif leading-none">"</div>
                  <p className="text-base md:text-lg text-foreground leading-relaxed italic px-4 text-pretty">
                    Қажылық мен ұмра жасаушылар Алла Тағаланың қонақтары, олар тілек етсе жауап береді, истиғфар етсе күнәсін кешіреді
                  </p>
                  <div className="absolute -bottom-8 -right-2 text-6xl text-primary/20 font-serif leading-none">"</div>
                </blockquote>

                <div className="pt-4">
                  <p className="text-sm md:text-base text-muted-foreground font-medium">
                    — Хадис (Насаи, Ибн Мажа)
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>


      {/* Form Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-10 bg-card border-border shadow-xl">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Дұғаңызды жіберіңіз
                </h3>
                <p className="text-muted-foreground">
                  Төмендегі форманы толтырыңыз, мен сіздің дұғаңызды Кағба жанында оқимын
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">


                <div className="space-y-2">
                  <Label htmlFor="dua" className="text-base font-medium text-foreground">
                    Дұға
                  </Label>
                  <Textarea
                    id="dua"
                    name="dua"
                    required
                    placeholder="Дұғаңызды осы жерге жазыңыз..."
                    value={formData.dua}
                    onChange={handleChange}
                    className="min-h-32 text-base resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quranDedication" className="text-base font-medium text-foreground">
                    Құран бағыштау (міндетті емес)
                  </Label>
                  <Textarea
                    id="quranDedication"
                    name="quranDedication"
                    placeholder="Тізім жазып жіберіңіз: ата-ана, ата-әже, аға-іні, бауырлар.&#10;Мысалы:&#10;Ботанбайұлы Ибинжан, &#10;Қозбағарқызы Әлімбүбі"
                    value={formData.quranDedication}
                    onChange={handleChange}
                    className="min-h-32 text-base resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    Тек аты мен әкесінің атын жазыңыз, тегі қажет емес. Мысалы:&#10;Ботанбайұлы Ибинжан, &#10;Қозбағарқызы Әлімбүбі
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? 'Жіберілуде...' : 'Дұғаны жіберу'}
                </Button>
                <div className="">
                  <Link href="/requisites" className="w-full">
                    <Button
                        className="mt-5 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                    >
                      Реквизиттерді көру
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground text-sm">
            Алла Тағала сіздердің дұғаларыңызды қабыл етсін және берекесін берсін • Ин шаа Аллаһ
          </p>
        </div>
      </footer>

      {/* Success Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center text-2xl font-serif">
              Дұғаңыз жіберілді
            </DialogTitle>
            <DialogDescription className="text-center text-base space-y-4 pt-4">
              <p className="text-foreground font-medium">
                Мен міндетті түрде сіздің дұғаңызды қасиетті Кағба жанында оқимын, Ин шаа Аллаһ.
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground">
                  Қалауыңыз бойынша маған жолға ақша жібере аласыз, бірақ бұл міндетті емес =)
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 pt-4">
            <Link href="/requisites" className="w-full">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Реквизиттерді көру
              </Button>
            </Link>
            <Button
              onClick={() => {
                setIsModalOpen(false)
                resetForm()
              }}
              variant="outline"
              className="w-full"
            >
              Жабу
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
