import { ValidationException, MessagesBagContract, ErrorReporterContract } from '@ioc:Adonis/Core/Validator'

/**
 * The shape of an individual error
 */
type ErrorNode = { rule; field: string; message: string }

export class MyReporter implements ErrorReporterContract<{ success: number; message: string; data: ErrorNode[] }> {
  public hasErrors = false

  /**
   * Tracking reported errors
   */
  private errors: ErrorNode[] = []

  constructor(private messages: MessagesBagContract, private bail: boolean) {}

  /**
   * Invoked by the validation rules to
   * report the error
   */
  public report(pointer: string, rule: string, message: string, arrayExpressionPointer?: string, args?: any) {
    /**
     * Turn on the flag
     */
    this.hasErrors = true

    /**
     * Use messages bag to get the error message. The messages
     * bag also checks for the user-defined error messages and
     * hence must always be used
     */
    const errorMessage = this.messages.get(pointer, rule, message, arrayExpressionPointer, args)

    /**
     * Track error message
     */
    this.errors.push({
      rule,
      field: pointer,
      message: errorMessage,
    })

    /**
     * Bail mode means stop validation on the first
     * error itself
     */
    if (this.bail) {
      throw this.toError()
    }
  }

  /**
   * Converts validation failures to an exception
   */
  public toError() {
    throw new ValidationException(false, this.toJSON())
  }

  /**
   * Get error messages as JSON
   */
  public toJSON() {
    return { success: 0, message: 'We found error in the form', data: this.errors }
  }
}
