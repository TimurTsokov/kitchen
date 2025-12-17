export const siteConfig = {
    title: "Bulgarian kitchen",
    description: "Bulgarian cuisine recipes",
    navItems: [
        {href: "/", label: "Receipts"},
        {href: "/ingredients", label: "Ingredients"},
        {href: "/about", label: "About"},
    ],
    pagesContent: {
        '/': {
            content: "Receipts on this page",
        },
        '/ingredients': {
            content: "Traditional ingredients bolgarian kitchen",
        },
        '/about': {
            content: `
                <p>
                 Болгарская кухня — это гармоничное сочетание свежих овощей, ароматных специй,
                    насыщенных мясных блюд и традиционных молочных продуктов, отражающее богатое
                    культурное наследие и гостеприимство болгарского народа.
                </p>
                <br/>
                <h2>
                    Главные блюда болгарской кухни
                </h2>
                <br/>   
                <ul>
                    <li>
                        <strong>Шопска салата</strong> – традиционный болгарский салат из свежих овощей с брынзой и подсолнечным маслом.
                    </li>
                    <li>
                        <strong>Баница</strong> – слоёный пирог из тонкого теста с начинкой из сыра, яиц и йогурта. Часто подают на праздники.
                    </li>
                    <li>
                        <strong>Каварма</strong> – тушёное мясо (обычно свинина) с луком, болгарским перцем и томатами. Подаётся в глиняных горшочках.
                    </li>
                    <li>
                        <strong>Таратор</strong> – холодный суп из йогурта, огурцов и чеснока. Освежающее летнее блюдо.
                    </li>
                    <li>
                        <strong>Мусака</strong> – запеканка из картофеля и фарша с заливкой из яиц и йогурта. Популярна во всех регионах Болгарии.
                    </li>
                </ul>
            `,
        }
    },
    notFound: {
        content: "Page not found",
    }
}