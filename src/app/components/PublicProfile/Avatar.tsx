import Image from "next/image";

interface AvatarProps {
    name: string;
    imageUrl?: string | null;
    size?: number; // optional custom size in pixels
}

export default function Avatar({ name, imageUrl, size = 128 }: AvatarProps) {
    const initials = name.charAt(0).toUpperCase();
    // const dimensions = { width: size, height: size };

    return (
        <div
            className="avatar"
            style={{ width: size, height: size }}
        >
            {imageUrl ? (
                <div
                    className="rounded-full overflow-hidden bg-gray-200"
                    style={{ width: size, height: size }}
                >
                    <Image
                        src={imageUrl}
                        alt={name}
                        width={size}
                        height={size}
                        className="object-cover w-full h-full"
                    />
                </div>
            ) : (
                <div
                    className="bg-accent text-neutral-content rounded-full flex items-center justify-center"
                    style={{ width: size, height: size }}
                >
                    <span className="text-3xl">{initials}</span>
                </div>
            )}
        </div>
    );
}