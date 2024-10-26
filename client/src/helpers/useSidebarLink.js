
import allSideBarLinks from "../data/sidebarLinks"
import { useState } from "react"

const useSidebarAuth = () => {
    const [reducedModules, setReducedModules] = useState([])
    const ValidateSidebar = (modules) => {
        // console.log(modules)
        let permittedModules = []
        allSideBarLinks.map((value, key) => {
            modules.map((currentModule, moduleKey) => {
                if(currentModule.module_name === value.module_name){
                    permittedModules.push(value);
                }
            })
        })
        setReducedModules(permittedModules);
    }

    return { ValidateSidebar, reducedModules }
}

export default useSidebarAuth