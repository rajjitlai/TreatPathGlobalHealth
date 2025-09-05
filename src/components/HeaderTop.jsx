import { BsFacebook, BsInstagram, BsPinterest, BsSnapchat } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const HeaderTop = () => {
    return (
        <div className='hidden sm:block bg-primary text-white dark:bg-secondary'>
            <div className="container py-2 px-4 md:px-16">
                <div className="flex justify-between items-center text-sm">
                    <div className="hidden lg:flex gap-4">
                        <div className='header_icons'>
                            <Link to="https://www.facebook.com/profile.php?id=61561559393495" target='_blank'>
                                <BsFacebook />
                            </Link>
                        </div>
                        <div className='header_icons'>
                            <Link to="https://www.snapchat.com/add/treatpathglobal?share_id=Nz03kAb8DLI&locale=en-US" target='_blank'>
                                <BsSnapchat />
                            </Link>
                        </div>
                        <div className='header_icons'>
                            <Link to="https://www.instagram.com/treatpathglobal/" target='_blank'>
                                <BsInstagram />
                            </Link>
                        </div>
                        <div className='header_icons'>
                            <Link to="https://in.pinterest.com/treatpath/" target='_blank'>
                                <BsPinterest />
                            </Link>
                        </div>
                    </div>

                    <div className='text-white/90'>
                        Welcome to TreatPath Global Health
                    </div>

                    {/* extra */}
                    <div className=''>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop