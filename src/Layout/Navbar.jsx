import React from 'react';

const NavLinks = [
    { href: '#about', name: 'About' },
    { href: '#projects', name: 'Projects' },
    { href: '#experience', name: 'Experience' },
    { href: '#testimonials', name: 'Testimonials' },
    { href: '#contact', name: 'Contact' }
]

const Navbar = () => {
    return (
        <header className='w-9/12 mx-auto py-5 bg-transparent'>
            <nav className='w-full flex justify-between'>
                <a href='#' className='text-2xl font-bold tracking-tight hover:text-(--color-primary)'>
                    Ruhul Amin<span className='text-(--color-primary)'> .</span>
                </a>
                <ul className='flex justify-center items-center gap-5 text-lg font-medium'>
                    {NavLinks.map((link, index) => (
                        <a key={index} href={link.href} className='hover:text-blue-500'>
                            {link.name}
                        </a>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;