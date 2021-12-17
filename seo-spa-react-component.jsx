import React from 'react';
import Helmet from 'react-helmet';
import config from "../config.json";
import { SEO as SeoConstants } from "../common/constants";
import { isEmpty } from './utils';

// recommended dimensions for thumbnail that appears when someone shares your website: 1200 pixels x 627 pixels (1.91/1 ratio)

//Sample Complete Website
/*<SEO type={SeoConstants.Types.Website} />*/

export const SEO = ({
  location,
  title,
  type,
  description,
  datePublished,
  authorTwitterUserName,
  dateModified,
  covers,
  readTime,
  author
}) => {
  //date format: 2015-02-05T08:00:00+08:00
  const domain = config.seo.domain;
  const socialLinks = config.seo.socialLinks;
  const address = config.seo.address;
  const contact = config.seo.contact;
  const legalName = config.seo.legalName;
  const logo = config.seo.logo;
  const url = `${domain}/${location}`;

  const titleToShow = title ? `Pellerex | ${title}` : config.seo.defaultTitle;
  const authorToShow = author ? author : config.seo.defaultAuthor;
  const authorTwitterUserNameToShow = authorTwitterUserName ? authorTwitterUserName : config.seo.socialLinks.defaultAuthorTwitterUserName;
  const descriptionToShow = description ? description : config.seo.defaultDescription;

  const structuredDataArticle = `{
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://google.com/article"
      },
      "headline": "${titleToShow}",
      "image": "${!isEmpty(covers) ? covers : [logo]}",
      "datePublished": "${datePublished}",
      "dateModified": "${dateModified}",
      "author": {
        "@type": "Person",
        "name": "${authorToShow}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "${legalName}",
        "logo": {
          "@type": "ImageObject",
          "url": "${logo}"
        }
      }
    }`;

  const structuredDataOrganization = `{
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "image": "${!isEmpty(covers) ? covers : [logo]}",
      "@id": "${domain}",
      "name": "${config.seo.legalName}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${address.streetAddress}",
        "addressLocality": "${address.addressLocality}",
        "addressRegion": "${address.addressRegion}",
        "postalCode": "${address.postalCode}",
        "addressCountry": "${address.addressCountry}"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Tom Smith"
        }
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -33.82169723510742,
        "longitude": 151.1860809326172
      },
      "url": "${domain}",
      "telephone": "${contact.phone}",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "17:00"
        }
      ]
    }`

  return (

    <Helmet>
      <meta
        name='robots'
        content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        data-react-helmet="true" />
      <title>{titleToShow}</title>
      <meta name="description" content={`${descriptionToShow}`} data-react-helmet="true" />
      <meta property="og:site_name" content={`${config.seo.siteName}`} data-react-helmet="true" />
      <meta property="og:locale" content="en_AU" data-react-helmet="true" />
      {/* Opengraph meta tags for Facebook & LinkedIn */}
      <meta property="og:url" content={`${url}`} data-react-helmet="true" />
      <meta
        property="og:type"
        content={type === SeoConstants.Types.Article ? 'article' : 'website'}
        data-react-helmet="true"
      />
      <meta
        property="og:title"
        content={titleToShow}
        data-react-helmet="true"
      />
      <meta
        property="og:description"
        content={`${descriptionToShow}`}
        data-react-helmet="true"
      />
      <meta
        property="og:image"
        content={`${!isEmpty(covers) ? covers[0] : logo}`}
        data-react-helmet="true"
      />

      {/*You can get this id when you create an app id on Facebook of your Facebook page*/}
      <meta property="fb:app_id" content={socialLinks.facebookAppId} data-react-helmet="true" />

      {/*These tags work for Twitter & Slack, notice I've included more custom tags like reading time etc...*/}
      <meta name="twitter:card" content="summary_large_image" data-react-helmet="true" />
      <meta
        property="article:published_time"
        content={`${datePublished}`}
        data-react-helmet="true"
      />

      {type === SeoConstants.Types.Article && <meta property="article:modified_time" content={`${dateModified}`} data-react-helmet="true" />}
      {type === SeoConstants.Types.Article && <meta name="twitter:label1" content="Written by" />}
      {type === SeoConstants.Types.Article && <meta name="twitter:data1" content={`${authorToShow}`} data-react-helmet="true" />}
      {type === SeoConstants.Types.Article && <meta name="twitter:label2" content="Est. reading time" data-react-helmet="true" />}
      {type === SeoConstants.Types.Article && <meta name="twitter:data2" content={`${readTime} min read`} data-react-helmet="true" />}
      {type === SeoConstants.Types.Article && <meta name="twitter:label1" value="Reading time" data-react-helmet="true" />}
      {type === SeoConstants.Types.Article && <meta name="twitter:data1" value={`${readTime} min read`} data-react-helmet="true" />}
      {type === SeoConstants.Types.Article && <meta name="author" content={`${authorToShow}`} data-react-helmet="true" />}

      <meta name="twitter:creator" content={authorTwitterUserNameToShow} data-react-helmet="true" />
      <meta name="twitter:site" content={socialLinks.twitter} data-react-helmet="true" />
      <meta name="twitter:domain" content={config.seo.domain} data-react-helmet="true" />
      <meta
        name="twitter:title"
        content={titleToShow}
        data-react-helmet="true"
      />
      <meta
        name="twitter:description"
        content={`${descriptionToShow}`}
        data-react-helmet="true"
      />
      <meta
        name="twitter:image"
        content={`${!isEmpty(covers) ? covers[0] : logo}`}
        data-react-helmet="true"
      />

      {/* Structured data */}
      <script type="application/ld+json">
        {type === SeoConstants.Types.Article
          ? structuredDataArticle
          : structuredDataOrganization}
      </script>
    </Helmet>
  )
}
