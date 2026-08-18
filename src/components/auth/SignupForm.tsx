'use client'

import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertCircle, LockKeyhole, Mail, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type SignupData = z.infer<typeof signupSchema>

export default function SignupForm() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignupData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: SignupData) => {
        try {
            setLoading(true)
            setError('')

            console.log('Signup Data:', data)

            const response = await axios.post(
                'http://localhost:3000/api/auth/signup',
                data
            )

            console.log(response.data)

            reset()

            router.push('/login')
        } catch (err) {
            console.error(err)

            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message ?? 'Signup failed.')
            } else {
                setError('Something went wrong.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background px-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-3xl font-bold">
                        Create Account
                    </CardTitle>

                    <CardDescription>
                        Join Fast Basket and start shopping today
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {error && (
                        <div className="mb-5 flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive">
                            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Full Name
                            </Label>

                            <div className="relative">
                                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    autoComplete="name"
                                    className="pl-10"
                                    {...register('name')}
                                />
                            </div>

                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email
                            </Label>

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="pl-10"
                                    {...register('email')}
                                />
                            </div>

                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">
                                Password
                            </Label>

                            <div className="relative">
                                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    className="pl-10"
                                    {...register('password')}
                                />
                            </div>

                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link
                            href="/signin"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign In
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}