'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check, ArrowLeft, CreditCard, Phone } from 'lucide-react'
import Link from 'next/link'

interface BankInfo {
  name: string
  cardNumber: string
  owner: string
  color: string
}

const banks: BankInfo[] = [
  {
    name: 'Kaspi Bank',
    cardNumber: '+7 747 267 47 47',
    owner: 'Қуаныш Б.',
    color: 'from-red-500 to-red-600'
  },
  {
    name: 'Freedom Bank',
    cardNumber: '4002 8900 2213 7883',
    owner: 'Қуаныш Б.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Halyk Bank',
    cardNumber: '4003 0351 2823 2233',
    owner: 'Қуаныш Б.',
    color: 'from-green-500 to-green-600'
  }
]

export default function RequisitesPage() {
  const [copiedCard, setCopiedCard] = useState<string | null>(null)
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null)

  const copyToClipboard = async (text: string, type: 'card' | 'phone', bankName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'card') {
        setCopiedCard(bankName)
        setTimeout(() => setCopiedCard(null), 2000)
      } else {
        setCopiedPhone(bankName)
        setTimeout(() => setCopiedPhone(null), 2000)
      }
    } catch (err) {
      console.error('Копирование не удалось:', err)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Артқа</span>
            </Link>
            <h1 className="text-xl md:text-2xl font-serif font-semibold text-foreground">Реквизиттер</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Intro */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground text-balance">
              Төлем реквизиттері
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Қолдау көрсеткіңіз келсе, төмендегі реквизиттердің кез келгенін пайдалануға болады
            </p>
          </div>

          {/* Bank Cards */}
          <div className="space-y-6">
            {banks.map((bank) => (
              <Card key={bank.name} className="overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-300">
                {/* Bank Header with Gradient */}
                <div className={`bg-gradient-to-r ${bank.color} p-6 text-white`}>
                  <h3 className="text-2xl font-bold">{bank.name}</h3>
                  <p className="text-white/90 text-sm mt-1">{bank.owner}</p>
                </div>

                {/* Card Details */}
                <div className="p-6 space-y-4">
                  {/* Card Number */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      <span className="font-medium">Карта нөмірі</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 text-xl md:text-2xl font-mono font-semibold text-foreground tracking-wider">
                        {bank.cardNumber}
                      </code>
                      <Button
                        onClick={() => copyToClipboard(bank.cardNumber.replace(/\s/g, ''), 'card', bank.name)}
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                      >
                        {copiedCard === bank.name ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Көшірілді
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            Көшіру
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border"></div>

                </div>
              </Card>
            ))}
          </div>

          {/* Note */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <p className="text-center text-muted-foreground leading-relaxed">
              Рахмет сізге және Алла Тағала қабыл етсін!
            </p>
          </Card>

          {/* Back Button */}
          <div className="flex justify-center pt-4">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Басты бетке оралу
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground text-sm">
            Алла Тағала сіздердің дұғаларыңызды қабыл етсін және баракасын берсін • Ин шаа Аллаһ
          </p>
        </div>
      </footer>
    </main>
  )
}
