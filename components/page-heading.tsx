export function PageHeading({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-center md:text-left text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
