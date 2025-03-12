/* eslint-disable @typescript-eslint/no-unused-vars */
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import {  WebhookEvent } from '@clerk/nextjs/server'
import { createOrUpdateUser } from '@/lib/user/actions'
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  const { id } = evt?.data 
  const eventType = evt?.type
 
if (eventType === 'user.created'|| eventType === 'user.updated') {
  const {first_name,last_name,image_url,email_addresses} = evt?.data 
  try{
   
    const user = await createOrUpdateUser(
      id || '',
      first_name || '',
      last_name || '',
      image_url || '',
      email_addresses
    )
  
    if(user && eventType === 'user.created'){
          try{
            const client = await clerkClient()
            await client.users.updateUserMetadata(id || '', {
              publicMetadata: {
                userMongoId: user._id,
              },
            })
         

          }catch(error){
            console.error('Error: Failed to create user', error);
          }
    }
  }catch(error) {
    console.error('Error: Failed to create user', error);
  }

}

// if (evt.type === 'user.updated') {
// console.log('user updated:');
// }
if(id){
if (eventType === 'user.deleted') {
  console.log('user deleted:', id);
  try{
    const client = await clerkClient()
    await client.users.deleteUser(id)
  }catch(error){
    console.error('Error: Failed to delete user', error);
  }
}

}

  return new Response('Webhook received', { status: 200 })
}





