
## CMS/Items example


```
   mbake -b
   cd CMS
```

## dat.yaml  -part 2

dat.yaml has dual usage.

- One is static. Used to configure the Pug page, and help with repeated fields. For example, in SEO or to help when sharing item/content with a social network.
- The other is dynamic, with dat_i.yaml, used to create items.json from dat.yaml.

```
   cd CMS
   mbake -i .
```
That generates an items.json file that you can front-end fetch(| axios), and bind dynamically.

