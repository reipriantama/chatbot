"use client"

import { useChat } from 'ai/react'
import { SendIcon, SquareIcon } from "lucide-react"

import Markdown from 'react-markdown'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat(
    { api: '/api/chat' }
  )
  console.log(messages);


  return (
    <div className="flex flex-col h-[80vh] w-full max-w-[1000px] mx-auto bg-background rounded-lg shadow-lg">
      <div className="flex-1 overflow-auto p-6">
        {messages.length === 0 && (
          <div className='flex flex-col items-center justify-center h-full gap-5'>
            <Image src="/ai.png" alt="AI" width={80} height={80} />
            <p>
              Welcome to the chatbot. Ask me anything.
            </p>
          </div>
        )}
        <div className="flex flex-col gap-4">
          {messages.map((messages) =>
            messages.role === 'assistant' ? (
              <div
                key={messages.id}
                className="flex items-start gap-3">
                <div className="p-2 border border-gray-700 rounded-full" >
                  <Image src="/ai.png" alt="AI" width={40} height={40} />
                </div>
                <p className="bg-muted rounded-lg p-3 max-w-[90%]">
                  {/* <p className="text-sm text-muted-foreground">
                    {messages.content}
                  </p> */}
                  <Markdown className="text-sm text-muted-foreground whitespace-pre-wrap overflow-x-auto">{messages.content}</Markdown>
                </p>
              </div>
            ) : (
              <div
                key={messages.id}
                className="flex justify-end">
                <div className="bg-primary rounded-lg p-3 max-w-[90%]">
                  <p className="text-sm text-primary-foreground whitespace-pre-wrap overflow-x-auto">
                    {messages.content}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-muted/50 px-4 py-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Textarea
            placeholder="Type your message..."
            className="rounded-lg pr-12 min-h-[64px] justify-center flex"
            rows={2}
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Mencegah pembuatan baris baru
                handleSubmit(e); // Kirim pesan
              }
            }}
          />

          {!isLoading ? (
            <Button type="submit" size="icon" disabled={!input || isLoading} className="absolute bottom-3 right-3 rounded-full">
              <SendIcon className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </Button>
          ) : (
            <Button type="button" size="icon" disabled={!isLoading} onClick={stop} className="absolute bottom-3 right-3 rounded-full">
              <SquareIcon className="w-5 h-5" fill='white' />
              <span className="sr-only">Send</span>
            </Button>
          )}
        </div>
      </form >
    </div>
  )
}