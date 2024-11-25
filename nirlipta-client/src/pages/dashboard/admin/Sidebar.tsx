// import { Layout } from "../components/custom/layout";
// import { Button } from "../components/custom/button";
// import { IconChevronsLeft, IconMenu2, IconX } from "@tabler/icons-react";
// import { useState } from "react";
// import { cn } from "@/lib/utils";
//
// const sidelinks = [
//     { title: "Retreats", href: "/admin/retreats", icon: "🧘‍♂️" },
//     { title: "Workshops", href: "/admin/workshops", icon: "📚" },
//     { title: "Partners", href: "/admin/partners", icon: "🤝" },
//     { title: "Users", href: "/admin/users", icon: "👤" },
// ];
//
// interface SidebarProps {
//     isCollapsed: boolean;
//     setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
// }
//
// export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
//     const [navOpened, setNavOpened] = useState(false);
//
//     return (
//         <aside
//             className={cn(
//                 `fixed left-0 top-0 z-50 h-full border-r bg-white shadow-md transition-all ${
//                     isCollapsed ? "w-16" : "w-64"
//                 }`
//             )}
//         >
//             <Layout>
//                 <Layout.Header className="flex items-center justify-between px-4 py-3">
//           <span
//               className={cn("text-lg font-semibold", {
//                   hidden: isCollapsed,
//               })}
//           >
//             Admin Panel
//           </span>
//                     <Button
//                         size="icon"
//                         variant="ghost"
//                         onClick={() => setIsCollapsed(!isCollapsed)}
//                     >
//                         {isCollapsed ? <IconMenu2 /> : <IconChevronsLeft />}
//                     </Button>
//                 </Layout.Header>
//
//                 <nav className="mt-4">
//                     {sidelinks.map((link) => (
//                         <a
//                             key={link.title}
//                             href={link.href}
//                             className={cn(
//                                 "flex items-center px-4 py-2 transition hover:bg-gray-100",
//                                 {
//                                     "justify-center": isCollapsed,
//                                 }
//                             )}
//                         >
//                             <span>{link.icon}</span>
//                             <span
//                                 className={cn("ml-2 text-sm font-medium", {
//                                     hidden: isCollapsed,
//                                 })}
//                             >
//                 {link.title}
//               </span>
//                         </a>
//                     ))}
//                 </nav>
//             </Layout>
//         </aside>
//     );
// }
