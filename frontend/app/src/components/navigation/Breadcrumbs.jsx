import { Breadcrumb } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  
  // 🔹 Transforme l'URL en segments
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb.Root p={4} bg="gray.100">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link as={Link} to="/">Accueil</Breadcrumb.Link>
        </Breadcrumb.Item>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <Breadcrumb.Item key={to}>
              {isLast ? (
                <Breadcrumb.CurrentLink>{decodeURIComponent(value)}</Breadcrumb.CurrentLink>
              ) : (
                <>
                  <Breadcrumb.Link as={Link} to={to}>{decodeURIComponent(value)}</Breadcrumb.Link>
                  <Breadcrumb.Separator />
                </>
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};

export default Breadcrumbs;
