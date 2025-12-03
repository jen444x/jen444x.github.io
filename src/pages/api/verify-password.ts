import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { password } = body

    // Get the upload password from environment
    const correctPassword = import.meta.env.UPLOAD_PASSWORD

    if (!correctPassword) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error: Password not set' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (password === correctPassword) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    } else {
      return new Response(
        JSON.stringify({ error: 'Incorrect password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
