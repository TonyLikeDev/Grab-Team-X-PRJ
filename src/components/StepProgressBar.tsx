"use client"

import { Check } from "lucide-react"

interface StepProgressBarProps {
  currentStep: number
  steps: string[]
}

export default function StepProgressBar({ currentStep, steps }: StepProgressBarProps) {
  return (
    <div className="w-full bg-gradient-to-r from-primary via-accent to-primary py-5 px-4 md:px-8 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep

            return (
              <div key={stepNumber} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all duration-300 ${
                      isCompleted
                        ? "bg-white text-primary shadow-lg scale-110"
                        : isCurrent
                        ? "bg-white text-primary ring-4 ring-white/30 shadow-xl scale-110"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : stepNumber}
                  </div>
                  <span className={`text-xs md:text-sm font-semibold text-center hidden md:block transition-all ${
                    isCurrent ? "text-white" : "text-white/80"
                  }`}>
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 md:mx-4">
                    <div
                      className={`h-full rounded transition-all duration-300 ${
                        isCompleted ? "bg-white shadow-sm" : "bg-white/20"
                      }`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}