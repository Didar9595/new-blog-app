'use client'
import React, { useState } from "react";
import { Button, Dropdown, Tooltip } from "flowbite-react";

const SharePost = ({ postUrl, postTitle }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 20000);
  };

  const shareOptions = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    },
    {
      name: "Twitter",
      url: `https://twitter.com/share?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`,
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`,
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + " " + postUrl)}`,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Dropdown for Share Options */}
      <Dropdown label="Share" className=" text-white">
        {shareOptions.map((option, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => window.open(option.url, "_blank")}
          >
            {option.name}
          </Dropdown.Item>
        ))}
        <Dropdown.Item onClick={handleCopy}>
          {copied ? "Copied!" : "Copy Link"}
        </Dropdown.Item>
      </Dropdown>

      {/* Tooltip for Copy Action */}
      <Tooltip
        content={copied ? "Link Copied!" : "Copy Link"}
        placement="top"
        style="light"
      >
        <Button color="gray" size="xs" onClick={handleCopy}>
          Copy
        </Button>
      </Tooltip>
    </div>
  );
};

export default SharePost;
