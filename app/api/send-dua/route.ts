import { NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = '8301955979:AAFj7q6fTqiScT5x-MgzY0cwktarcJ_kpKc'
const TELEGRAM_CHAT_ID = '5006602561'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, dua, quranDedication, wishes } = body

    // Формируем сообщение для Telegram
    let message = `🕌 ЖАҢА ДҰА\n\n`
    message += `👤 Аты-жөні: ${name}\n\n`
    message += `🤲 Дұға:\n${dua}\n\n`
    
    if (quranDedication && quranDedication.trim()) {
      message += `📖 Құран бағыштау:\n${quranDedication}\n\n`
    }
    
    if (wishes && wishes.trim()) {
      message += `💭 Тілектер:\n${wishes}\n`
    }

    // Отправляем в Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    })

    if (!response.ok) {
      throw new Error('Telegram API сұранысы сәтсіз аяқталды')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Дұғаны жіберу қатесі:', error)
    return NextResponse.json(
      { success: false, error: 'Дұға жіберілмеді' },
      { status: 500 }
    )
  }
}
