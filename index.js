addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event));
});

// Defined 'links' array
const links = [
  {   "name": "My Profile",
      "url": "https://www.linkedin.com/in/kshitijsutar/"},
  {   "name": "My Repository",
      "url": "https://lynnmiro.github.io/"},
  {   "name": "My Resume",
      "url": "https://docs.google.com/document/d/e/2PACX-1vTpvcTM2q8b2ZUk7mQ6-VBw8pqsXUfBmwlCdhtIDGu4_gjOonHPiBMYBRjE0AagGyEwwdqZv5s9SuLR/pub"}
      ];

// Used the custom class to create elements from 'links' array
class LinksTransformer {
  constructor(links) {
      this.links = links;
  }

  async element(element) {
      links.forEach(link => {
          element.append(`<a href="${link.url}">${link.name}</a>`, { html: true });
      });
  }

}

// Created profile element
class ProfileTransformer {
  async element(element) {
      element.removeAttribute('style');
      element.get;
  }
}

// Added my avatar
class AvatarTransformer {
  async element(element) {
      element.setAttribute("src", "https://media-exp1.licdn.com/dms/image/C4E03AQFToLTdv0RoNw/profile-displayphoto-shrink_400_400/0?e=1609372800&v=beta&t=OU6R0iiC-qknDkR5DuKuIg2PREc4FY5B70hW2zCHiuY");
  }
}

// Added header
class HeaderTransformer {
  async element(element) {
      element.setInnerContent("Kshitij Jayprakash Sutar");
  }
}

// Extra Credit

// Added my social network links 
class SocialTransformer {
  async element(element) {
      element.removeAttribute('style');
      element.append("<a href=\"https://linkedin.com/in/kshitijsutar\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/1384/1384014.svg\"></a>", { html: true });
      element.append("<a href=\"https://github.com/kshitij2208\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/25/25231.svg\"></a>", { html: true });
      element.append("<a href=\"https://www.facebook.com/ksutar1\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/1051/1051309.svg\"></a>", { html: true });
      element.append("<a href=\"https://twitter.com/sutar_kshitij\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/733/733635.svg\"></a>", { html: true });
  }
}

// Changed the Title of webpage to my name
class TitleTransformer {
  async element(element) {
      element.setInnerContent("Kshitij Jayprakash Sutar");
  }
}

// Changed the background color to 'Tailwind'
class BackgroundTransformer {
  async element(element) {
      element.setAttribute("class", "bg-blue-900");
  }
}

async function handleRequest(event) {
  var url = new URL(event.request.url);
  var element = url.pathname.split("/").filter(n => n);
  
  // Redirected to JSON Response of 'links' array
  if (element[0] === "links") {
      var json = JSON.stringify(links, null, 2);
      return new Response(json, {
          headers: {
              "content-type": "application/json;charset=UTF-8"
          }
      });

  } else if (element[0] === undefined) {
      var headers = {
          headers: {
              "content-type": "text/html;charset=UTF-8"
          },
      };

      var Response = await fetch("https://static-links-page.signalnerve.workers.dev/", headers);

      // Added all transformers to HTMLRewriter
      return new HTMLRewriter()
          .on("div#links", new LinksTransformer())
          .on("div#profile", new ProfileTransformer())
          .on("img#avatar", new AvatarTransformer())
          .on("h1#name", new HeaderTransformer())
          .on("title", new TitleTransformer())
          .on("div#social", new SocialTransformer())
          .on("body", new BackgroundTransformer())
          .transform(Response);
  } else {
      // Error handling
      return new Response("Error 404 - Not Found", { status: "404" });
  }
}