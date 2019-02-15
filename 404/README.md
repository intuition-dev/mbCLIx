# 404 error redirect

To redirect from not existing pages (eg: http://blog-website.s3-website-us-east-1.amazonaws.com/hgjhg) to the home page, on AWS s3 bucket console go to `Properties` tab, select `Static website hosting` and add code to the `Redirection rules` textarea like this:

```sh
<RoutingRules>
    <RoutingRule>
        <Condition>
            <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
        </Condition>
        <Redirect>
            <HostName>blog-website.s3-website-us-east-1.amazonaws.com</HostName>
            <ReplaceKeyWith>home/</ReplaceKeyWith>
        </Redirect>
    </RoutingRule>
</RoutingRules>
```

Specify page to which 404 will be redirected in `<ReplaceKeyWith>` tag and the host name in `<HostName>` tag.

See this ![screenshot](image.png?raw=true "AWS s3 404 redirect") for more information.