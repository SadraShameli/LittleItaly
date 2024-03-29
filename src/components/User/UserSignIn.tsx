/* eslint-disable @typescript-eslint/no-misused-promises */

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import Card from '~/components/Card';
import { InputField, InputInfoText } from '~/components/InputField';

import AppleIcon from '~/components/Icons/Apple';
import GoogleIcon from '~/components/Icons/Google';
import TwitchIcon from '~/components/Icons/Twitch';
import SignInIcon from '~/components/Icons/SignIn';

import Routes from '~/utils/route';
import { UserSignInSchema, type UserSignInForm } from './UserTypes';

export default function UserSignIn() {
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserSignInForm>({ resolver: zodResolver(UserSignInSchema) });

    const onSubmit: SubmitHandler<UserSignInForm> = async (data) => {
        const result = await signIn('credentials', {
            username: data.email,
            password: data.password,
            callbackUrl: '/',
            redirect: false,
        });

        if (result?.ok) {
            setErrorMessage('');
        } else if (result?.error) {
            setErrorMessage(result.error);
        }
    };

    return (
        <form className='relative mx-auto max-w-lg' onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <h2 className='flex items-center justify-between'>
                    Sign in
                    <SignInIcon />
                </h2>

                <div className='grid gap-5'>
                    <button className='btn-outline btn gap-2' type='button' onClick={() => signIn('google', { callbackUrl: '/' })}>
                        <GoogleIcon />
                        Sign in with Google
                    </button>

                    <div className='grid gap-5 sm:grid-cols-2 '>
                        <button className='btn-outline btn gap-2' type='button' onClick={() => signIn('apple', { callbackUrl: '/' })}>
                            <AppleIcon />
                            Sign in with Apple
                        </button>

                        <button className='btn-outline btn gap-2' type='button' onClick={() => signIn('twitch', { callbackUrl: '/' })}>
                            <TwitchIcon />
                            Sign in with Twitch
                        </button>
                    </div>

                    <div className='divider'>or</div>

                    <InputField placeholder='you@domain.com' autoComplete='email' title='Email address' type='email' {...register('email')}>
                        {errors.email && <InputInfoText>{errors.email?.message}</InputInfoText>}
                        {errorMessage && <InputInfoText>{errorMessage}</InputInfoText>}
                    </InputField>

                    <InputField
                        placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                        autoComplete='current-password'
                        title='Password'
                        type='password'
                        {...register('password')}
                    >
                        {errors.password && <InputInfoText>{errors.password?.message}</InputInfoText>}
                    </InputField>

                    <div className='flex justify-between'>
                        <label>
                            <input type='checkbox' {...register('remember')} />
                            <span>Remember me</span>
                        </label>

                        <Link className='link-primary hover:link' href={Routes.resetPassword} type='button'>
                            Lost your password?
                        </Link>
                    </div>

                    <button className='btn-primary btn' type='submit'>
                        Login to your account
                    </button>

                    <div className='flex gap-2'>
                        <span>Not registered?</span>
                        <Link className='link-primary link' type='button' href={Routes.account}>
                            Create your account
                        </Link>
                    </div>
                </div>
            </Card>
        </form>
    );
}
