import { Box } from '@mui/material';
import '../../App.css';

function Navbar() {
    return (
        <nav>
            <Box>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Projects</li>
                    <li>Products</li>
                </ul>
            </Box>
        </nav>
    )
}

export default Navbar