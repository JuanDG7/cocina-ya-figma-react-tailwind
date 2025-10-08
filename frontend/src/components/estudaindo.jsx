exports.createRecipe = async (req, res) => {
  const cover = req.files?.cover?.[0] || null;
  const photos = req.files?.photos || [];

  const ownersRaw = req.body.photoStepId;
  const owners = Array.isArray(ownersRaw)
    ? ownersRaw
    : ownersRaw
    ? [ownersRaw]
    : [];

  if (photos.length !== owners.length) {
    return res.status(422).json({
      erroresBack: [{ msg: "Fotos desalineadas con pasos" }],
    });
  }

  const paired = photos.map((f, i) => ({
    file: f,
    stepId: owners[i],
  }));

  return res.status(201).json({ ok: true });
};
