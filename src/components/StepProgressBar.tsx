"use client"

import { Check } from "lucide-react"

interface StepProgressBarProps {
  currentStep: number
  steps: string[]
}

export default function StepProgressBar({ currentStep, steps }: StepProgressBarProps) {
  return (
    <div className="w-full bg-primary py-4 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            const isLast = index === steps.length - 1

            return (
              <div key={stepNumber} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-semibold transition-all ${
                      isCompleted
                        ? "bg-white text-primary"
                        : isCurrent
                        ? "bg-white text-primary ring-4 ring-white/30"
                        : "bg-primary-foreground/20 text-primary-foreground"
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                  </div>
                  <span className="text-xs md:text-sm text-primary-foreground mt-2 text-center hidden md:block">
                    {step}
                  </span>
                </div>
                {!isLast && (
                  <div className="flex-1 h-1 mx-2 md:mx-4">
                    <div
                      className={`h-full rounded transition-all ${
                        isCompleted ? "bg-white" : "bg-primary-foreground/20"
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
